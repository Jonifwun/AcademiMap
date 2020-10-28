import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
import { db } from '../../firebase'
import Upload from '../Upload'
import Post from './Post'
import { UserContext } from '../../Contexts/UserContext'



const Posts = () => {
    //State
    const user = useContext(UserContext)

    const [posts, setPosts] = useState([])
    const [researchGroupID, setResearchGroupID] = useState('')
    const [lastVisible, setLastVisible] = useState({})

    // Last post ref
    const observer = useRef()
    const lastPostRef = useCallback(node => {
      console.log(node)
    })

    

    const getMorePosts = () => {
      db.collection('researchgroups').doc(researchGroupID)
              .collection('posts')
              .orderBy('timestamp', 'desc')
              .startAfter(lastVisible)
              .limit(10)
              .onSnapshot(snapshot => {

                const lastVisible = snapshot.docs[snapshot.docs.length-1]
                setLastVisible(lastVisible)

                setPosts(prevPosts => {
                  const newPosts = snapshot.docs.map((doc, index) => ({
                    id: doc.id,
                    post: doc.data()
                  }))
                  return [...prevPosts, newPosts]
                })
            })
    }

    useEffect(() => {

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
              .limit(10)
              .onSnapshot(snapshot => {

                const lastVisible = snapshot.docs[snapshot.docs.length-1]
                setLastVisible(lastVisible)

                setPosts(snapshot.docs.map(doc => ({
                  id: doc.id,
                  post: doc.data()
                }
              )))
            })
            setResearchGroupID(researchGroupID)
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
      </React.Fragment> 
    )
}

export default Posts
