import { Button, Card, FormControl, Input, InputLabel } from '@material-ui/core'
import React, { useState, useContext } from 'react'
import { db } from '../../firebase'
import firebase from 'firebase'
import { UserContext } from '../../Contexts/UserContext'
import generator from 'generate-password'

const CreateGroupForm = ({ setOpenModal }) => {

    const user = useContext(UserContext)

    const [groupName, setGroupName] = useState('')

    const createGroup = (e) => {
        e.preventDefault()

        const groupPasscode = generator.generate({
            length: 10,
            numbers: true
        })
        //Create the new group and store as a reference
        const newGroup = db.collection('researchgroups').doc()
        //Set the initial data of the group
        newGroup.set({
            groupName: groupName,
            groupmembers: [user.displayName],
            groupCreated: firebase.firestore.FieldValue.serverTimestamp(),
            groupPasscode: groupPasscode,
            groupLeader: user.displayName
        })
        .then(()=>{
            //Add the research group to the user who created it
            db.collection('users').doc(user.displayName).set({
                researchGroup: newGroup.id
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
                        style={{color: '#FFF'}}
                    />
                </FormControl>
               
            </Card>
            <Button type="submit" onClick={ createGroup } variant="contained" color="primary" className="logInBtn">Create Group</Button>
        </div>
    )
}

export default CreateGroupForm
