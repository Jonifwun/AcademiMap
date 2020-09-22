import { Card } from '@material-ui/core'
import React from 'react'


function Profile({user}) {
    // console.log( user.displayName )
    return (
        <div>
        <Card style={{margin: '100px 30px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <div>
                    <img src="profile.jpg" alt="profilepicture" style={{width: '160px', height: "160px", borderRadius: '80px'}}></img>
                </div>

                <div>
                    {/* <h5>{ user.displayName }</h5> */}
                    <h4>Jonny Day</h4>
                    <p>Bio:</p>
                </div>

            </div>
        </Card>
        </div>
    )
}

export default Profile
