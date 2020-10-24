import { Button, Card } from '@material-ui/core'
import React, { useState, useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { storage, db } from '../../firebase'
import uuid from 'uuid'


const ProfilePic = ({ buttonStyle }) => {

    const user = useContext(UserContext)

    const [profileUpdate, setProfileUpdate] = useState(false)
    const [image, setImage] = useState(null)
    // const [userData, setUserData]

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }


    const handleUpload = () => {
        let name = uuid.v4() 
        
        storage.ref(`profileImages/${ name }`).put(image)
        .then(() => {
            storage.ref('profileImages')
            .child(name)
            .getDownloadURL()
            .then(url => {
                user.updateProfile({
                    photoURL: url
                  }).then(() => {
                    console.log('success', url)
                  }).catch(err => {
                    console.log(err)
                  });
                return url
            }).then(url => {

                db.collection('users').doc(user.displayName).update({
                    photoURL: url
                })
                .then(() => {
                        setImage(null)
                        setProfileUpdate(false)
                }) 
                }).catch(err => {
                    console.log(err)
                })

            })
        // })
    }

    const profilePicStyles = {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#164B61',
        color: '#FFF',
        padding: '15px 15px',
    }

    return (
        
        <Card style={ profilePicStyles }> 
            <div style={ profilePicStyles }>
                { !profileUpdate && user ?
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {user.photoURL ? 
                        <img src={ user.photoURL } 
                        alt="profilepicture" 
                        style={{width: '160px', height: "160px", borderRadius: '80px'}}>
                        </img>
                    : 
                    <div>
                        <h5>No current profile picture</h5>
                    </div>
                    }
                    <Button style={ buttonStyle } onClick={() => setProfileUpdate(true) }>Update Profile Picture</Button>
                </div>
                : 
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Button onClick={() => setProfileUpdate(false)} variant="contained" color="primary">Close</Button>              
                    <input type="file" onChange={ handleChange } style={{margin: '35px 0'}}/>            
                    <Button onClick={ handleUpload } variant="contained" color="secondary">Upload</Button>
                </div>
                }
            </div>
        </Card>

        
    )
}

export default ProfilePic
