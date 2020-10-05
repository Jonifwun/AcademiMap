import React, { useContext, useEffect, useState } from 'react'
import { Card } from '@material-ui/core'
import Bio from './Bio'
import { UserContext } from '../Contexts/UserContext'
import Group from './Group'
import { db } from '../firebase'
import ProfilePic from './ProfilePic'
import Collaborators from './Collaborators'


function Profile() {

    const user = useContext(UserContext)
    
    const [researchGroup, setResearchGroup] = useState({})
    const [userData, setUserData] = useState({})
    

    console.log(user)

    useEffect(() => {
        
        if(user){
            try {
                    //Match the users id to any groups
                   db.collection('researchgroups').where('groupmembers', 'array-contains', user.displayName).get()
                   .then(function(querySnapshot) {
                       querySnapshot.forEach(doc => {
                           // doc.data() is never undefined for query doc snapshots
                           console.log(doc.id, " => ", doc.data())
                           //set the research group to state
                           const res = doc.data()
                           setResearchGroup(res)
                       })
                   })
               .catch(function(error) {
                   console.log("Error getting documents: ", error);
               });
            } catch (err){
                console.log(err)
            }

            try {
                db.collection('users').where('userID', '==', user.uid).get()
               .then(querySnapshot => {
                   let memberData = querySnapshot.docs[0].data()
                   setUserData(memberData)               
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


    const buttonStyle = { color: '#FFF', backgroundColor: '#019CDD', margin: '25px'}

    return (
        <div>{ user ? 
            <div>
                <Card style={{margin: '80px 30px 30px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        <ProfilePic buttonStyle={ buttonStyle } />    
                        <Bio collaborators={ researchGroup.groupmembers } posts={ userData.posts } />
                        <Group buttonStyle={ buttonStyle } researchGroup={ researchGroup }/>
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
            <Card style={{margin: '100px 30px 40px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px', display: 'flex', justifyContent: 'center'}}>
                <h5>Please Log In To View Profile</h5>
            </Card>
        }
        </div>
    )
}

export default Profile
