import React, { useContext, useState } from 'react'
import { Button, Card, FormControl, TextField } from '@material-ui/core'
import { db } from '../firebase'
import { UserContext } from '../Contexts/UserContext'
import firebase from 'firebase'

function AddPaperCard({setAddPaperDisplay, username, postID, researchGroupID}) {

    const user = useContext(UserContext)

    const [title, setTitle] = useState('')
    const [doi, setDoi] = useState('')
    const [description, setDescription] = useState('')

    const handleClose = () => {
        setAddPaperDisplay(false) 
    }

    const submitPaper = (e) => {
        e.preventDefault();

        const regex = RegExp("10.\\d{4,9}/[-._;()/:a-z0-9A-Z]+")
        if(regex.test(doi.trim()) === true){
            
            if(title && doi && description){
    
              const paper = {
                title,
                doi,
                description, 
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              }  
    
              db.collection('researchgroups').doc(researchGroupID)
              .collection('posts')
              .doc(postID)
              .collection('papers')
              .add(paper)
              .then((docRef) => {
                  console.log(docRef.id)
                const paperID = docRef.id
                return paperID
              })
              .then((paperID) => {
                db.collection('users').doc(username)
                  .collection('posts')
                  .doc(postID)
                  .collection('papers')
                  .doc(paperID)
                  .set(paper)
              }).then(() => {
                setAddPaperDisplay(false)
              }).catch((err) => {
                  console.log('Document failed to upload:', err)
              })                    
            }
        }  
    }

    const inputStyle = {
        margin: '15px 25px',
        color: '#FFF',
    }

    return (
        <Card style={{backgroundColor: '#009DDC', marginBottom: '20px', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h5 style={{marginTop: '5px'}}>Add Paper</h5>
            <form autoComplete='off' style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <FormControl variant="outlined">

                    <TextField id="title" value={ title } onChange={(e) => setTitle(e.target.value)} label="Title" style={inputStyle} />
                </FormControl>
                <FormControl variant="outlined">
                    
                    <TextField value={ doi } onChange={(e) => setDoi(e.target.value)} label="DOI" style={inputStyle}/>
                </FormControl>
                <FormControl variant="outlined">
                    
                    <TextField value={ description } onChange={(e) => setDescription(e.target.value)} label="Description" style={inputStyle}/>
                </FormControl>
                <Button onClick={ submitPaper } style={{color: '#FFF', backgroundColor: '#0582b3', margin: '25px 0'}}>Submit</Button>
            </form>
            
            <button onClick={ handleClose } style={{marginBottom: '3px', outline: 'none', border: 'none', backgroundColor: '#009DDC', color: '#FFF', cursor: 'pointer'}}>close</button>
        </Card>
    )
}
export default AddPaperCard
