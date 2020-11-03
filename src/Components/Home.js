import { Card } from '@material-ui/core'
import React from 'react'
import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'

const Home = () => {
    return (
        <Card style={{display: 'flex', flexDirection: 'column', width: '750px', alignItems: 'center', backgroundColor: '#186180', padding: '25px'}}>
            <LogInForm />
            <SignUpForm />
        </Card>
    )
}

export default Home

