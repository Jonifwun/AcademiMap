import React, {  useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import Bio from './profile/Bio'
import { db } from '../firebase'
import Post from './posts/Post'
import { UserContext } from '../Contexts/UserContext'
import { Card } from '@material-ui/core'
import ErrorBoundary from './ErrorBoundary'
import Loader from 'react-loader-spinner'


const UserFeed = () => {

const user = useContext(UserContext)  

let { username } = useParams()

const [posts, setPosts] = useState([])
const [userData, setUserData] = useState({})
const [researchGroup, setResearchGroup] = useState({})
const [loading, setLoading] = useState(true)

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
      setLoading(false)
    }}, [username])

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
                { 
                  posts.map(({ post, id }) => (
                          //the post belongs to this username
                  <ErrorBoundary>        
                    <Post  username={ userData.username }
                            //this is the signed in user 
                            {...post}
                            userFeedData={ userData } 
                            key={ id } 
                            postID={ id } 
                            researchGroupID={ userData.researchGroup }
                    />
                  </ErrorBoundary>
                      ))
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
