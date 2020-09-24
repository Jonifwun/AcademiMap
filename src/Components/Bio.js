import React from 'react'
import { Card } from '@material-ui/core'


function Bio({ user }) {
    return (

        <Card style={{display: 'flex', flexDirection: "column", alignItems: "center", backgroundColor: '#164B61', color: '#FFF', padding: '15px 35px'}}>
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

        </Card>
    )
}

export default Bio
