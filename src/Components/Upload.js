import React, { useState } from 'react'
import { Button, Card, Input } from '@material-ui/core';
import '../Upload.css'
import { storage, db } from '../firebase'
import firebase from "firebase"

function Upload() {

    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progressBar, setProgressBar] = useState(0)
    

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
                    imageUrl: url,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        }
        )
    }

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    return (
        <Card className="uploadCard">
            <Input type="text" placeholder="Caption" onChange={(e) => setCaption(e.target.value) } value={ caption }/>
            <input type="file" onChange={ handleChange }/>
            <Button onClick={ handleUpload } variant="contained" color="secondary">Upload</Button>
        </Card>
    )
}

export default Upload
