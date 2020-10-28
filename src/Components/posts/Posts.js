import React, { useEffect, useState, useContext } from 'react'
import { db } from '../../firebase'
import Upload from '../Upload'
import Post from './Post'
import { UserContext } from '../../Contexts/UserContext'



const Posts = () => {
    
    const [posts, setPosts] = useState([])
    const [researchGroupID, setResearchGroupID] = useState('')
    const [lastVisible, setLastVisible] = useState({})

    const user = useContext(UserContext)

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
              posts.map(({ post, id }) => (
                      //the post belongs to this username
              <Post                            //this is the signed in user 
                user={ user } 
                key={ id } 
                postID={ id }
                researchGroupID={ researchGroupID }
                {...post}
              />
                      
              ))
            }
        </div>
        { user?.displayName ? <Upload username={ user.displayName } researchGroupID={ researchGroupID }/> : null }
      </React.Fragment> 
    )
}

export default Posts
