import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
import { db } from '../../firebase'
import Upload from '../Upload'
import Post from './Post'
import { UserContext } from '../../Contexts/UserContext'
import Loader from 'react-loader-spinner'



const Posts = () => {
    //State
    const user = useContext(UserContext)

    const [posts, setPosts] = useState([])
    const [researchGroupID, setResearchGroupID] = useState('')
    const [lastVisible, setLastVisible] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)

    // Last post ref
    const observer = useRef()  

    const getMorePosts = () => {
      setLoading(true)
      db.collection('researchgroups').doc(researchGroupID)
              .collection('posts')
              .orderBy('timestamp', 'desc')
              .startAfter(lastVisible)
              .limit(6)              
              .onSnapshot(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length-1]

                if(snapshot.docs.length === 0) setHasMore(false)

                if(lastVisible) setLastVisible(lastVisible)

                const newPosts = snapshot.docs.map(doc => ({
                  id: doc.id,
                  post: doc.data()
                }))
                setPosts(prevPosts => {
                  return [...prevPosts, ...newPosts]
                })
                setLoading(false)
            })
    }

    const lastPostRef = useCallback(node => {
      //If loading, do nothing
      if (loading) return
      //Want to disconnect from the previous last post and then reconnect to the new last post
      if(observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
          console.log('Post is visible')
          //Here we want to run getMorePosts if there are any posts left
          if(hasMore) getMorePosts()
        }
      })
      if(node) observer.current.observe(node)
      console.log(node)
    }, [loading, getMorePosts, hasMore])

    useEffect(() => {
      setLoading(true)
      if(user){
        db.collection('users').doc(user.displayName).get()
          .then((userDoc) => {

            let user;
            if (userDoc.exists) {
              user = userDoc.data()
            } else {
                console.log("No such document!");
            }
          return user.researchGroup

          }).then((researchGroupID) => {
            db.collection('researchgroups').doc(researchGroupID)
              .collection('posts')
              .orderBy('timestamp', 'desc')
              .limit(6)
              .onSnapshot(snapshot => {

                const lastVisible = snapshot.docs[snapshot.docs.length-1]
                console.log(lastVisible)
                setLastVisible(lastVisible)

                setPosts(snapshot.docs.map(doc => ({
                  id: doc.id,
                  post: doc.data()
                }
              )))
            })
            setResearchGroupID(researchGroupID)
            setLoading(false)
          }).catch((error) => {
            console.log("Error getting document:", error);
        })
      }
      }, [user])

    return (
      <React.Fragment>
         
        <div style={{display: 'grid', grid: 'auto-flow dense / repeat(2, 50%)', placeItems: 'center', margin: '85px 0'}}>
            {
              posts.map(({ post, id }, index) => {
              if(posts.length === index + 1){
                return (
                  <Post
                    ref={ lastPostRef }                           
                    user={ user } 
                    key={ id } 
                    postID={ id }
                    researchGroupID={ researchGroupID }
                    {...post}
                  />
                )
              } else {
                return (
                  <Post
                    ref={ null }                           
                    user={ user } 
                    key={ id } 
                    postID={ id }
                    researchGroupID={ researchGroupID }
                    {...post}
                  />
                )
              }                            
            })
            }
        </div>
        { user?.displayName ? <Upload username={ user.displayName } researchGroupID={ researchGroupID }/> : null }
        
        {loading && <Loader
                        style={{position: 'absolute', left: '50%', marginBottom: '60px'}}
                        type="Grid"
                        color='#009DDC'
                        height={50}
                        width={50}
                    />
        }
        
      </React.Fragment> 
    )
}

export default Posts
