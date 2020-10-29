import React, { useContext, useState } from 'react'
import { db } from '../firebase'
import { useFetch } from './useFetch'
import firebase from 'firebase'
import { UserContext } from '../Contexts/UserContext'
import { Button, Card, FormControl, TextField } from '@material-ui/core'
import Loader from 'react-loader-spinner'

const SubmitNewPaper = ({doi, username, postID, researchGroupID, setNewPaperDisplay}) => {

    const user = useContext(UserContext)

    const [description, setDescription] = useState('')

    const url = `http://api.crossref.org/works/${doi}`

    const {data} = useFetch(url)
    console.log('data:', data)


    const handleClose = () => {
        setNewPaperDisplay(false) 
    }

    const inputStyle = {
        margin: '15px 25px',
        color: '#FFF',
    }

    const submitPaper = (e) => {
        e.preventDefault();
            
            if(doi && description){
    
              const paper = {
                title: data.message.title,
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
                setNewPaperDisplay(false)
              }).catch((err) => {
                  console.log('Document failed to upload:', err)
              })                    
            }
        
    }

    return (
        <div>
            {data.message ? 
                <Card style={{backgroundColor: '#009DDC', marginBottom: '20px', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h5 style={{marginTop: '5px'}}>Add Paper</h5>
                    <Card style={{padding: '5px', margin: '10px', backgroundColor: '#174B61', color: '#FFF', width: '95%'}}> 
                        <h5><em>{ data.message.title[0] }</em></h5>
                        <a href={data.message.URL || `https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer" style={{color: "#FFF", display: 'inline-block'}}><h5>DOI: { doi }</h5></a>
                        <h5><em>{`${data.message.author[0].family} et al`}</em></h5>
                        <p>{ description }</p>
                    </Card>
                    <form autoComplete='off' style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <FormControl variant="outlined">                   
                            <TextField value={ description } onChange={(e) => setDescription(e.target.value)} label="Description" style={inputStyle}/>
                        </FormControl>
                        <Button onClick={ submitPaper } style={{color: '#FFF', backgroundColor: '#0582b3', margin: '25px 0'}}>Submit</Button>
                    </form>
                    <button onClick={ handleClose } style={{marginBottom: '3px', outline: 'none', border: 'none', backgroundColor: '#009DDC', color: '#FFF', cursor: 'pointer'}}>close</button>
                </Card>
                : 
                <Card style={{backgroundColor: '#009DDC', marginBottom: '20px', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px 0'}}>
                    <Loader
                        type="Grid"
                        color='#174B61'
                        height={50}
                        width={50}
                        timeout={5000} //5 secs
                    />
                </Card>
            }
            
        </div>
    )
}

export default SubmitNewPaper
