import React, { useEffect, useState, useContext } from 'react'
import { db } from '../firebase'
import Upload from './Upload'
import Post from './Post'
import { UserContext } from '../Contexts/UserContext'



function Posts() {
    
    const [posts, setPosts] = useState([])

    // const userContext = useContext(UserContext)
    // const { user } = userContext

    const user = useContext(UserContext)

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
          }
          )))
        })  
      }, [])

    return (
        <div>
            <div style={{display: 'grid', grid: 'auto-flow dense / repeat(2, 50%)', placeItems: 'center', margin: '85px 0'}}>
                {
                    posts.map(({ post, id }) => (
                            //the post belongs to this username
                    <Post  username={ post.username }
                            //this is the signed in user 
                            user={ user } 
                            key={ id } 
                            postID={ id } 
                            caption={ post.caption } 
                            imgsrc={ post.imgsrc }
                            />
                            
                    ))
                    
                }
            </div>
            { user?.displayName ? <Upload username={ user.displayName }/> : null }
        </div>
    )
}

export default Posts
