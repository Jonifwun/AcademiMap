import React, { useEffect, useState, useContext } from 'react'
import { db } from '../firebase'
import Upload from './Upload'
import Post from './Post'
import { UserContext } from '../Contexts/UserContext'



function Posts() {
    
    const [posts, setPosts] = useState([])

    const user = useContext(UserContext)

    useEffect(() => {
        //GOTTA CHANGE THIS FETCHING OF POSTS TO BE DETERMINED BY GROUP?

        //Grab user from db, user.researchGroup
      if(user){

        db.collection('users').doc(user.displayName).get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
            } else {
                console.log("No such document!");
            }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
          

        db.collection('researchgroups').doc('researchgroupID')
          .collection('posts')
          .orderBy('timestamp', 'desc')
          .onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
              id: doc.id,
              post: doc.data()
            }
          )))
        })

      }

        // if(user){
        //   db.collection('users').where('researchGroup', 'array-contains', user.displayName).get()
        //   .then((querySnapshot) => {
        //     querySnapshot.forEach((doc))
        //     console.log(doc.data())
        //   })
        // }

      }, [user])

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
