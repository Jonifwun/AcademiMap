import React, { useContext, useEffect, useState } from 'react'
import { Card } from '@material-ui/core'
import Bio from './Bio'
import { UserContext } from '../../Contexts/UserContext'
import { MemoizedGroup } from './Group'
import { db } from '../../firebase'
import ProfilePic from './ProfilePic'
import Collaborators from './Collaborators'


const Profile = () => {
   
    const user = useContext(UserContext)
    
    const [researchGroup, setResearchGroup] = useState({})
    const [userData, setUserData] = useState({})
    const [postCount, setPostCount] = useState('')

    useEffect(() => {
        
        if(user){
            try {
                //Match the users id to any groups
                db.collection('researchgroups').where('groupmembers', 'array-contains', user.displayName).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        //set the research group to state
                        const res = doc.data()
                        setResearchGroup(res)
                    })
                })
               .catch(err => {
                   console.log("Error getting documents: ", err);
               });
            } catch (err){
                console.log(err)
            }
            try {
                db.collection('users').doc(user.displayName).get()
                  .then(doc => {
                      let memberData = doc.data()
                      setUserData(memberData)               
                  }).then(()=> {
                    db.collection('users')
                      .doc(user.displayName)
                      .collection('posts')
                      .get()
                      .then((posts) => {
                        // setPosts(posts)
                        setPostCount(posts.docs.length)
                      })                      
                  })
                  .catch(err => {
                      console.log("Error getting documents: ", err);
                  });
            }
            catch (err) {
                console.log(err)
            }
            }     
        }, [user])


    const buttonStyle = { color: '#FFF', backgroundColor: '#019CDD', margin: '15px 5px'}

    return (
        <React.Fragment> 
            { user ? 
            <div>
                <Card style={{margin: '80px 30px 30px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        <ProfilePic buttonStyle={ buttonStyle } />    
                        <Bio collaborators={ researchGroup.groupmembers } posts={ postCount } userData={ userData } />
                        <MemoizedGroup buttonStyle={ buttonStyle } researchGroup={ researchGroup } userData={ userData }/>
                    </div>
                </Card>
                <Card style={{margin: '0 30px 30px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px'}}>
                    
                        { researchGroup?.groupmembers ?
                        <Collaborators collaborators={ researchGroup.groupmembers }/>
                            : null      
                        }  

                </Card>
            </div>
            : 

            //Please login card - separate into it's own component and conditionally render message
            <Card style={{margin: '100px 30px 40px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px', display: 'flex', justifyContent: 'center'}}>
                <h5>Please Log In To View Profile</h5>
            </Card>
            }
        </React.Fragment> 
    )
}

export default Profile
