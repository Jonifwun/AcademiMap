import React, { useContext } from 'react'
import { Card } from '@material-ui/core'
import { UserContext } from '../Contexts/UserContext'


function Bio({ collaborators, posts }) {

    const user = useContext(UserContext)


    return (

        <Card style={{display: 'flex', flexDirection: "column", alignItems: "center", backgroundColor: '#164B61', color: '#FFF', padding: '15px 35px'}}>
            <h5>{user?.displayName }</h5>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', margin: '20px 50px'}}> 
                    {posts ? <h5>{ posts.length } posts</h5> : null}
                    {collaborators ? <h5>{ collaborators.length -1 } collaborators</h5> : null}
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
