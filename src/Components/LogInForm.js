import React, { useState } from 'react'
import { Button, Card, FormControl, Input, InputLabel } from '@material-ui/core'
import '../SignUpForm.css'
import { auth } from 'firebase'
import LogInSignUpHeader from './LogInSignUpHeader'

function LogInForm({setOpenModal}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const logIn = (e) => {
        e.preventDefault()

        auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
          
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            alert(errorMessage)
           
          });
        setOpenModal(false)  
    }

    return(
        <div className="logInDiv">
            <LogInSignUpHeader />     
            
            <form className="logInForm">
                <Card id="Card">
                <h2>Log In</h2>
                    
                <FormControl className="input">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input 
                        placeholder="Email"
                        type="email"
                        id="email"
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                    
                <FormControl className="input">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input 
                        placeholder="Password"
                        type="password"
                        id="password"
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                </Card>
                <Button type="submit" onClick={ logIn } variant="contained" color="primary" className="logInBtn">Log In</Button>
            </form>
           
            
        </div>
    )

}


export default LogInForm