import React, {  useState, useEffect, useContext, useRef, useCallback } from 'react'
import { useParams } from "react-router-dom"
import Bio from './profile/Bio'
import { db } from '../firebase'
import Post from './posts/Post'
import { UserContext } from '../Contexts/UserContext'
import { Card } from '@material-ui/core'
import ErrorBoundary from './ErrorBoundary'
import Loader from 'react-loader-spinner'
import { useGetPostsFromFirestore } from './useGetPostsFromFirestore'
import { GetMorePosts } from './GetMorePosts'


const UserFeed = () => {

const user = useContext(UserContext)  

let { username } = useParams()

const [posts, setPosts] = useState([])
const [userData, setUserData] = useState({})
const [researchGroup, setResearchGroup] = useState({})
const [loading, setLoading] = useState(true)
const [lastVisible, setLastVisible] = useState(null)
const [hasMore, setHasMore] = useState(true)

useEffect(() => {
  //This use effect deals with grabbing the user document from firebase ready for the useGetPostsFromFirestore hook
    if(username){
      db.collection('users').doc(username).get()
        .then((userDoc) => {

          let user;
          if (userDoc.exists) {
            user = userDoc.data()
            setUserData(user)
          } else {
              console.log("No such document!");
          }
        return user

        }).then((user) =>{
            console.log('user data:', user) 
            db.collection('researchgroups').doc(user.researchGroup).get()
            .then(doc => {
                const researchGroupData = doc.data()
                setResearchGroup(researchGroupData)
                console.log('research group data', researchGroupData)
            })
        })
        .catch((error) => {
          console.log("Error getting document:", error);
      })
      setLoading(false)
    }}, [username])

    //custom hook that runs on mounting to grab initial set of posts
    const { data: firstPosts, initialLastVisible, dataLoading, error } = useGetPostsFromFirestore({
      collection: 'users',
      id: userData.username
    })

    useEffect(() => {
      //This use effect deals with setting posts and last visible post 
      if(dataLoading) return
      setPosts(firstPosts)
      setLastVisible(initialLastVisible)
      setLoading(false)
    }, [user, firstPosts, initialLastVisible, dataLoading])

    //Logic below deals with watching for the last post, then loading more if there are any

    const observer = useRef()
    
    const lastPostRef = useCallback(node => {
      //If loading, do nothing
      if (loading) return
      //Want to disconnect from the previous last post and then reconnect to the new last post
      if(observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
          console.log('Post is visible')
          //Here we want to run getMorePosts if there are any posts left
          if (hasMore) GetMorePosts({
            collection: 'users', 
            id: userData.username,
            setLoading,
            lastVisible,
            setLastVisible,
            setHasMore,
            setPosts
          })
        }
      })
      if(node) observer.current.observe(node)
    }, [loading, hasMore, lastVisible, userData])

    return (
      <ErrorBoundary>
        <React.Fragment>
          {user ?            
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}>              
                <ErrorBoundary>
                  <Bio 
                  userFeedData={ userData }
                  posts={ posts.length }
                  collaborators={ researchGroup?.groupmembers }
                  />
                </ErrorBoundary>
                {loading && <Loader
                        style={{position: 'absolute', left: '50%'}}
                        type="Grid"
                        color='#009DDC'
                        height={50}
                        width={50}
                    />
                } 
                <ErrorBoundary> 
                  {
                    posts.map(({ post, id }, index) => (
                            //the post belongs to this username
                      <Post  username={ userData.username }
                        //this is the signed in user 
                        ref={ posts.length === index + 1 ? lastPostRef : null }
                        {...post}
                        userFeedData={ userData } 
                        key={ id } 
                        postID={ id } 
                        researchGroupID={ userData.researchGroup }
                      />
                    ))
                  }
                </ErrorBoundary>                
                {
                  posts.length === 0 && 
                  <Card style={{margin: '100px 30px 40px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px', display: 'flex', justifyContent: 'center'}}>
                    <h5>This user has no posts to display</h5>
                  </Card>
                }
            </div>
                : 
                <Card style={{margin: '100px 30px 40px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px', display: 'flex', justifyContent: 'center'}}>
                    <h5>Please Log In To View UserFeed</h5>
                </Card>
          }          
        </React.Fragment> 
      </ErrorBoundary>               
    )
}

export default UserFeed
