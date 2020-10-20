import React, { useContext, useState } from 'react'
import { Button, Card, FormControl, InputLabel, OutlinedInput } from '@material-ui/core'
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
        margin: '15px 5px',
        color: '#FFF'
    }

    return (
        <Card style={{backgroundColor: '#009DDC', marginBottom: '20px', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h5 style={{marginTop: '5px'}}>Add Paper</h5>
            <form autoComplete='off' style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="title" style={{color: "#FFF"}}>Title</InputLabel>
                    <OutlinedInput id="title" value={title} onChange={(e) => setTitle(e.target.value)} label="Name" style={inputStyle} />
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="doi" style={{color: "#FFF"}}>DOI</InputLabel>
                    <OutlinedInput id="doi" value={doi} onChange={(e) => setDoi(e.target.value)} label="Name" style={inputStyle}/>
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="component-outlined" style={{color: "#FFF"}}>Description</InputLabel>
                    <OutlinedInput id="description" value={description} onChange={(e) => setDescription(e.target.value)} label="Name" style={inputStyle} />
                </FormControl>
                <Button onClick={ submitPaper } style={{color: '#FFF', backgroundColor: '#0582b3'}}>Submit</Button>
            </form>
            
            <button onClick={ handleClose } style={{marginBottom: '3px', outline: 'none', border: 'none', backgroundColor: '#009DDC', color: '#FFF', cursor: 'pointer'}}><h5>x</h5> close</button>
        </Card>
    )
}
export default AddPaperCard
