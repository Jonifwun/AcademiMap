import React, {  useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Bio from './profile/Bio'
import { db } from '../firebase'
import Post from './Post'

function UserFeed() {

let { username } = useParams()

const [posts, setPosts] = useState([])
const [userData, setUserData] = useState({})
const [researchGroup, setResearchGroup] = useState({})

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
        return user

        }).then((user) => {
          db.collection('users').doc(user.username)
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
              setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
                length: snapshot.docs.length
              }
            )))
          })
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
    }}, [username])

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}>            
            <Bio 
            userFeedData={ userData }
            posts={ posts.length }
            collaborators={ researchGroup?.groupmembers }
            />
            { 
                posts.map(({ post, id }) => (
                        //the post belongs to this username
                <Post  username={ userData.username }
                        //this is the signed in user 
                        userFeedData={ userData } 
                        key={ id } 
                        postID={ id } 
                        caption={ post.caption } 
                        imgsrc={ post.imgsrc }
                        researchGroupID={ userData.researchGroup }
                        />
                    ))
                }
        </div>        
    )
}

export default UserFeed
