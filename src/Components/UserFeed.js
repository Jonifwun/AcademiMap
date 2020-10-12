import React from 'react'
import useParams from "react-router-dom"

function UserFeed() {

let { username } = useParams()

    return (
        <div>            
            <h5 style={{marginTop: '200px'}}>User Page</h5>
        </div>
    )
}

export default UserFeed
