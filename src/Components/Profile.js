import React, {useEffect, useState} from 'react'
import { Button, Card } from '@material-ui/core'


function Profile(props) {
    
    const [user, setUser] = useState(null)

    useEffect(() => {
        if(props.user){
            setUser(props.user)
        }
        
    }, [props.user])

    return (
        <div>
            <Card style={{margin: '100px 30px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <img src="profile.jpg" alt="profilepicture" style={{width: '160px', height: "160px", borderRadius: '80px'}}></img>
                        <Button style={{ color: '#FFF', backgroundColor: '#019CDD', margin: '25px'}} >Update Profile Picture</Button>
                    </div>

                    <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                        <h5>{user?.displayName }</h5>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', margin: '20px 50px'}}> 
                            <h5>10 posts</h5>
                            <h5>10 collaborators</h5>
                            <h5>20 following</h5>
                            
                        </div>
                        <hr style={{width: '100%', margin: '15px'}}></hr>
                        <p style={{width: '300px', textAlign: 'justify'}}>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                           sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                           Diam quam nulla porttitor massa id neque aliquam. Elementum curabitur
                           vitae nunc sed velit. Neque convallis a cras semper auctor neque vitae
                           tempus. Maecenas sed enim ut sem viverra aliquet.</p>

                    </div>

                </div>
            </Card>
        </div>
    )
}

export default Profile
