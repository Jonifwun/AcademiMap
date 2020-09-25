import React, { useEffect, useState, useContext } from 'react'
import { db } from '../firebase'
import Upload from './Upload'
import Post from './Post'
import UserContext from '../contexts/UserContext'



function Posts({ user }) {
    
    const [posts, setPosts] = useState([])

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
            <div className="posts">
                {
                    posts.map(({ post, id }) => (
                            //the post belongs to this username
                    <Post className="postComponent" username={ post.username }
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
