import React, { useState } from 'react'
import { Button, Card, FormControl, Input, InputLabel } from '@material-ui/core'
import '../SignUpForm.css'
import { auth } from 'firebase'
import LogInSignUpHeader from './LogInSignUpHeader'
import { db } from '../firebase'


function SignUpForm({setOpenModal}) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signUp = (e) => {
        e.preventDefault();

        auth().createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            setOpenModal(false)
            
            authUser.user.updateProfile({
                displayName: username
            })
            return authUser.user.uid
              
        }).then((uid) => {
            //Create separate database for querying later - no credentials etc.
            return db.collection('users').add({
                userID: uid,
                username: username,
                posts: [],
                photoURL: ''
            })
        }) 
        .catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            if (errorCode === 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }  
        })
    } 

    return(
        <div className="signUpDiv">
            <LogInSignUpHeader />       
            
            <form className="signUpForm">
                <Card id="Card">
                <h2>Sign Up</h2>
                <FormControl className="input">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input 
                        type="text"
                        id="username"
                        value={ username }
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl> 
                    
                <FormControl className="input">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input 
                        type="email"
                        id="email"
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                    
                <FormControl className="input">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input 
                        type="password"
                        id="password"
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                </Card>
                <Button type="submit" onClick={ signUp } variant="contained" color="primary" className="signUpBtn">Sign Up</Button>
            </form>
           
            
        </div>
    )

}


export default SignUpForm