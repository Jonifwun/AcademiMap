import React, { useEffect, useState } from 'react'
import { Card } from '@material-ui/core'
import { db } from '../firebase'

function UserCard({ userID }) {

    const [userData, setUserData] = useState({})

    console.log( 'props User Id',userID )

    useEffect(() => {
        db.collection('users').where('userID', '==', userID).get()
        .then(querySnapshot => {
            let memberData;
            querySnapshot.forEach(doc => {
                memberData = doc.data()
                console.log('memberData:', memberData)
            })
            setUserData(memberData) 
                      
        })
        .catch(err => {
            console.log("Error getting documents: ", err);
        });
    }, [userID])
    console.log('console user:', userData)  
        
    return (
        <div>
            <Card style={{display: 'flex', flexDirection: "column", alignItems: "center", backgroundColor: '#164B61', color: '#FFF', padding: '15px 35px'}}>
                <h5>{ userData.username }</h5>
        
                <img src={ userData.photoURL } alt="profilepicture" style={{width: '80px', height: "80px", borderRadius: '80px', border: '4px solid #019CDD' , margin: '15px'}}></img>

            </Card>
        </div>
    )
}

export default UserCard
