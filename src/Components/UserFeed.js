import React, {  useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Bio from './Bio'
import { db } from '../firebase'
import Post from './Post'

function UserFeed() {

let { username } = useParams()

const [posts, setPosts] = useState([])
const [userData, setUserData] = useState({})

useEffect(() => {

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
        return user.username

        }).then((username) => {
          db.collection('users').doc(username)
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
              setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
              }
            )))
          })
        }).catch((error) => {
          console.log("Error getting document:", error);
      })
    }
    
    }, [username])

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}>            
            <Bio />
            { 
                    posts.map(({ post, id }) => (
                            //the post belongs to this username
                    <Post  username={ username }
                            //this is the signed in user 
                            // user={ user } 
                            key={ id } 
                            postID={ id } 
                            caption={ post.caption } 
                            imgsrc={ post.imgsrc }
                            researchGroupID={ userData.researchGroupID }
                            />
                            
                    ))
                    
                }
        </div>
        
    )
}

export default UserFeed
