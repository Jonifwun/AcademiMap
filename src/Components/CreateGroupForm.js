import { Button, Card, FormControl, Input, InputLabel } from '@material-ui/core'
import React, { useState, useContext } from 'react'
import { db } from '../firebase'
import firebase from 'firebase'
import { UserContext } from '../Contexts/UserContext'
import generator from 'generate-password'

function CreateGroupForm({ setOpenModal }) {

    const user = useContext(UserContext)

    const [groupName, setGroupName] = useState('')

    const createGroup = (e) => {
        e.preventDefault()

        const groupPasscode = generator.generate({
            length: 10,
            numbers: true
        })
        //Figure out how to have the user who created the group as the leader
        db.collection('researchgroups').doc().add({
            groupName: groupName,
            groupmembers: [user.displayName],
            groupCreated: firebase.firestore.FieldValue.serverTimestamp(),
            groupPasscode: groupPasscode,
            groupLeader: user.displayName
        }).then((docRef)=>{
            db.collection('users').doc(user.displayName).set({
                researchGroup: docRef.id
            })
        }).then(()=>{
            setOpenModal(false) 
        }).catch((err) => {
            console.log(err)
        })
              
           
    }

    return (
        <div> 
           <Card style={{     
            backgroundColor: '#0c3141',
            margin: '25px',
            width: '300px',
            maxWidth: '400px',
            color: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '25px'
            }}
            >

            <h2>Create Group</h2>
                <FormControl style={{width: '275px'}}>
                    <InputLabel name="groupName">Group Name</InputLabel>
                    <Input 
                        type="text"
                        id="groupName"
                        value={ groupName }
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </FormControl>
               
            </Card>
            <Button type="submit" onClick={ createGroup } variant="contained" color="primary" className="logInBtn">Create Group</Button>
        </div>
    )
}

export default CreateGroupForm
