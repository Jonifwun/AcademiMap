import React, {useEffect, useState, useContext} from 'react'
import { Button, Card } from '@material-ui/core'
import Bio from './Bio'
import UserCard from './UserCard'
import UserContext from '../contexts/UserContext'


function Profile(props) {
    
    const [user, setUser] = useState(null)

    useEffect(() => {
        if(props.user){
            setUser(props.user)
        }
        
    }, [props.user])

    return (
        <div>
            <Card style={{margin: '100px 30px 40px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <img src="profile.jpg" alt="profilepicture" style={{width: '160px', height: "160px", borderRadius: '80px'}}></img>
                        <Button style={{ color: '#FFF', backgroundColor: '#019CDD', margin: '25px'}} >Update Profile Picture</Button>
                    </div>
                    <Bio user={ user }/>


                </div>
            </Card>
            <Card style={{margin: '0 30px 30px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                </div>
            </Card>
        </div>
    )
}

export default Profile
