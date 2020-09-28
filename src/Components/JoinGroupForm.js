import { Button, Card, FormControl, Input, InputLabel } from '@material-ui/core'
import React, { useState, useContext } from 'react'
import { db } from '../firebase'
import firebase from 'firebase'
import { UserContext } from '../Contexts/UserContext'

function JoinGroupForm({ setOpenModal }) {

    const user = useContext(UserContext)

    const [passcode, setPasscode] = useState('')

    const joinGroup = (e) => {
        e.preventDefault()
        //Match the passcode first and get the doc.id
        db.collection('researchgroups').where('Group Passcode', '==', 'abcdef').get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data())
                //Using the doc id, add new user id to array of users
                db.collection('researchgroups').doc(doc.id).update({
                    groupmembers: firebase.firestore.FieldValue.arrayUnion(user.uid)
                })
                
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        

        // researchGroups.where('passcode', '==', passcode).then(doc => {
        //     if (doc.exists) {
        //         console.log("Document data:", doc.data());
        //     } else {
        //         // doc.data() will be undefined in this case
        //         console.log("No such document!");
        //     }
        // }).catch(function(error) {
        //     console.log("Error getting document:", error);
        // });

        setOpenModal(false)  
    }

    return (
        <div 
        // style={{     
        // margin: '25px',
        // width: '400px',
        // maxWidth: '650px',
        // color: '#FFF',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center'
        // }}
        >
            <Card style={{     backgroundColor: '#0c3141',
            margin: '25px',
            width: '300px',
            maxWidth: '400px',
            color: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '25px'
            }}>
                <h2>Join Group</h2>
                    
                <FormControl style={{width: '275px'}}>
                    <InputLabel htmlFor="password">Please Enter Group Passcode</InputLabel>
                    <Input 
                        type="password"
                        id="password"
                        value={ passcode }
                        onChange={(e) => setPasscode(e.target.value)}
                    />
                </FormControl>
                </Card>
                <Button type="submit" onClick={ joinGroup } variant="contained" color="primary" className="logInBtn">Join</Button>
        </div>
    )
}

export default JoinGroupForm
