import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from '@material-ui/core'
import Bio from './Bio'
import UserCard from './UserCard'
import { UserContext } from '../Contexts/UserContext'
import Group from './Group'
import { db } from '../firebase'


function Profile() {
    
    const [researchGroup, setResearchGroup] = useState({})
    const user = useContext(UserContext)
    console.log('Here is:', user)

   
    useEffect(() => {
        //Match the users id to any groups

        try {
            db.collection('researchgroups').where('groupmembers', 'array-contains', user.uid).get()
            .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data())
                const res = doc.data()
                setResearchGroup(res)

                // db.collection('researchgroups').doc(doc.id).update({
                //     groupmembers: firebase.firestore.FieldValue.arrayUnion(user.uid)
                // })
                
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        } catch (err){
            console.log(err)
        }
        
    }, [user])

    const buttonStyle = { color: '#FFF', backgroundColor: '#019CDD', margin: '25px'}

    return (
        <div>
            <Card style={{margin: '100px 30px 40px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <img src="profile.jpg" alt="profilepicture" style={{width: '160px', height: "160px", borderRadius: '80px'}}></img>
                        <Button style={ buttonStyle } >Update Profile Picture</Button>
                    </div>
                <Bio />
                <Group buttonStyle={ buttonStyle } researchGroup={ researchGroup }/>


                </div>
            </Card>
            <Card style={{margin: '0 30px 30px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                </div>
            </Card>
        </div>
    )
}

export default Profile
