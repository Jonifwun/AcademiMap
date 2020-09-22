import React, { useState } from 'react'
import { Button, Card, Input, Fab } from '@material-ui/core';
import '../Upload.css'
import { storage, db } from '../firebase'
import firebase from "firebase"
import AddIcon from '@material-ui/icons/Add';

function Upload( {username} ) {

    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progressBar, setProgressBar] = useState(0)
    const [uploadDisplay, setUploadDisplay] = useState(false)
    

    const handleUpload = () => {
        const upload = storage.ref(`images/${ image.name }`).put(image)

        upload.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred)/(snapshot.totalBytes)*100)
            setProgressBar(progress)
        },
        (error) => {
            console.log(error)
            alert(error.message)
        },
        () => {
            storage.ref('images')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                db.collection('posts').add({
                    caption: caption,
                    imgsrc: url,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    username: username
                })
                setProgressBar(0)
                setCaption('')
                setImage(null)
                setUploadDisplay(false)
            })
        }
        )
    }

    const handleChange = (e) => {
        if(e.target.files[0]){
            console.log(e.target.files[0].name)
            setImage(e.target.files[0])
            console.log(e.target.files[0])
        }
    }

    return (
        <Card style={{alignItems: 'center',
            display: 'flex',
            backgroundColor: '#019CDD',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            height: '55px',
            }}>
            
            {uploadDisplay ? <div className="uploadCard">
                <Button onClick={() => setUploadDisplay(false)} variant="contained" color="primary">Close</Button>
                <progress value={ progressBar } max='100' className="progressBar"/>               
                <input type="file" onChange={ handleChange }/>
                <Input type="text" placeholder="Caption" onChange={(e) => setCaption(e.target.value) } value={ caption }/>            
                <Button onClick={ handleUpload } variant="contained" color="secondary">Upload</Button>
            </div> 
            :  <div style={{alignItems: 'center',
            justifyContent:"center",
            display: 'flex',
            backgroundColor: '#019CDD',
          
            
            width: '100%'
            }}>
                    <Fab style={{backgroundColor:  '#164B61', height: '55px', width: '55px'}} color="primary" onClick={() => setUploadDisplay(true)}>
                        <AddIcon />
                    </Fab>
                </div> 
               
            }    
        </Card>
    )
}

export default Upload
