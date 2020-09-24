import React from 'react'
import { Card } from '@material-ui/core'

function UserCard() {
    return (
        <div>
            <Card style={{display: 'flex', flexDirection: "column", alignItems: "center", backgroundColor: '#164B61', color: '#FFF', padding: '15px 35px'}}>
                <h5>Jonny Day</h5>
        
                <img src="profile.jpg" alt="profilepicture" style={{width: '80px', height: "80px", borderRadius: '80px', border: '4px solid #019CDD' , margin: '15px'}}></img>

            </Card>
        </div>
    )
}

export default UserCard
