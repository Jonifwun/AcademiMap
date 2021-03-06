import { Button, Card, FormControl, Input, InputLabel } from '@material-ui/core'
import React, { useState, useContext } from 'react'
import { db } from '../../firebase'
import firebase from 'firebase'
import { UserContext } from '../../Contexts/UserContext'

const JoinGroupForm = ({ setOpenModal }) => {

    const user = useContext(UserContext)

    const [passcode, setPasscode] = useState('')

    const joinGroup = (e) => {
        e.preventDefault()

        if(user){

            db.collection('researchgroups').where('groupPasscode', '==', passcode).get()
            .then(querySnapshot => {
                querySnapshot.forEach(researchDoc => {
                    //Using the doc id, add new user id to array of users
                    db.collection('researchgroups').doc(researchDoc.id).update({
                        groupmembers: firebase.firestore.FieldValue.arrayUnion(user.displayName)
                    })
                    //I need to get the user from db - NEED TO CHANGE THIS BELOW TO REFACTORED VERSION, IT WORKS BUT IT'S OVERLY COMPLICATED
                    db.collection('users').where('userID', '==', user.uid).get()
                    .then(querySnapshot => {
                        const userDoc = querySnapshot.docs[0].data()
                        db.collection('users').doc(userDoc.id).update({
                            researchGroup: researchDoc.id
                        })
                    })
                })
            })
            .catch(err => {
                console.log("Error getting documents: ", err);
            });
    
            setOpenModal(false)  
        }
        
        //Match the passcode first and get the doc.id
    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default JoinGroupForm
