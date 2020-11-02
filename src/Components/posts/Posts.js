import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
import Upload from '../Upload'
import Post from './Post'
import { UserContext } from '../../Contexts/UserContext'
import { ResearchGroupContext } from '../../Contexts/ResearchGroupContext'
import Loader from 'react-loader-spinner'
import ErrorBoundary from '../ErrorBoundary'
import { useGetPostsFromFirestore } from '../useGetPostsFromFirestore'
import { GetMorePosts } from '../GetMorePosts'



const Posts = () => {
    //State
    const user = useContext(UserContext)
    const researchGroupID = useContext(ResearchGroupContext)

    const [lastVisible, setLastVisible] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [posts, setPosts] = useState([])
    
    //hook that runs on mounting to grab posts
    const { data: firstPosts, initialLastVisible, dataLoading, error } = useGetPostsFromFirestore({
      collection: 'researchgroups',
      id: researchGroupID
    })
    
    // Last post ref
    const observer = useRef()  

    //Set up an observer to follow the last post and then run getMorePosts when it appears on screen
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
            collection: 'researchgroups',
            id: researchGroupID,
            setLoading,
            lastVisible,
            setLastVisible,
            setHasMore,
            setPosts
          })
        }
      })
      if(node) observer.current.observe(node)
    }, [loading, hasMore, lastVisible, researchGroupID, setHasMore, setLastVisible, setLoading, setPosts])

    useEffect(() => {      
      if(dataLoading) return
      setPosts(firstPosts)
      setLastVisible(initialLastVisible)
      setLoading(false)
    }, [user, firstPosts, initialLastVisible, dataLoading])  
    
    return (
      <ErrorBoundary>
        <React.Fragment>       
          <div style={{display: 'grid', grid: 'auto-flow dense / repeat(2, 50%)', placeItems: 'center', margin: '85px 0'}}>
              {
                posts.map(({ post, id }, index) => {
                  return (
                    <Post
                      ref={ posts.length === index + 1 ? lastPostRef : null }                           
                      user={ user } 
                      key={ id } 
                      postID={ id }
                      researchGroupID={ researchGroupID }
                      {...post}
                    />
                  )                                          
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
      </ErrorBoundary> 
    )
}

export default Posts
