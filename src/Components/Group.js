import { Button, Card } from '@material-ui/core'
import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'

function Group() {

    const user = useContext(UserContext)

    return (
        // user ?
        // <Card style={{display: 'flex', flexDirection: "column", alignItems: "center", backgroundColor: '#164B61', color: '#FFF', padding: '15px 35px', objectFit: 'fill'}}> 
        //     <div style={{display: 'flex', flexDirection: "column", alignItems: "center", backgroundColor: '#164B61', color: '#FFF', padding: '15px 35px'}}>
        //         <h3>Research Group:</h3>
        //         <h5>Research Group Name</h5>
        //         <p style={{width: '300px', textAlign: 'justify'}}>
        //             Updates: 
        //             Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        //             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        //             Diam quam nulla porttitor massa id neque aliquam.                 
        //         </p>             
        //     </div>
        // </Card>
        // : 
        <Card style={{display: 'flex', flexDirection: "column", alignItems: "center", backgroundColor: '#164B61', color: '#FFF', padding: '15px 35px', objectFit: 'fill'}}>
            <p>You are currently not part of any research groups</p>
            <hr style={{color: '#FFF', width: '100%'}}></hr>
            <Button style={{ color: '#FFF', backgroundColor: '#019CDD', margin: '25px'}} >Join Group</Button>
            <Button style={{ color: '#FFF', backgroundColor: '#019CDD', margin: '25px'}} >Create Group</Button>
        </Card>
    )
}

export default Group
