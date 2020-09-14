import React, { useState } from 'react'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import '../SignUpForm.css'
import { auth } from 'firebase'


function SignUpForm() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signUp = (e) => {
        e.preventDefault();

        auth().createUserWithEmailAndPassword(email, password)
        .catch((err) => alert(err.message))
    } 

    return(
        <div className="signUpDiv">
            <div className="header">
                <img src="logo.png" alt="logo" className="headerLogo"></img>
            </div>
            <h2>Sign Up</h2>
            <form className="signUpForm">
                <FormControl>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input 
                        placeholder="Username"
                        type="text"
                        id="username"
                        value={ username }
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl> 
                    
                <FormControl>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input 
                        placeholder="Email"
                        type="email"
                        id="email"
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                    
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input 
                        placeholder="Password"
                        type="password"
                        id="password"
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button type="submit" onClick={ signUp } variant="contained" color="primary" className="signUpBtn">Sign Up</Button>
            </form>
            
        </div>
    )

}


export default SignUpForm