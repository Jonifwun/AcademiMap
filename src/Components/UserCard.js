import React, { useEffect, useState, memo } from 'react'
import { Card } from '@material-ui/core'
import { db } from '../firebase'
import { Link } from 'react-router-dom'

export function UserCard({ username }) {

    const [userData, setUserData] = useState({})

    useEffect(() => {
        db.collection('users').where('username', '==', username).get()
        .then(querySnapshot => {
            let memberData = querySnapshot.docs[0].data()
            setUserData(memberData)               
        })
        .catch(err => {
            console.log("Error getting documents: ", err);
        });
    }, [username])
        
    return (
        <div>
            <Card style={{display: 'flex', flexDirection: "column", alignItems: "center", backgroundColor: '#164B61', color: '#FFF', padding: '15px 35px'}}>
                <h5>
                    <Link 
                    to={`/users/${userData.username}`} 
                    style={{textDecoration: "none", color: '#FFF'}}
                    >
                    { userData.username }
                    </Link>
                </h5>
                <Link to={`/users/${userData.username}`}>
                    <img src={ userData.photoURL } alt="profilepicture" style={{width: '80px', height: "80px", borderRadius: '80px', border: '4px solid #019CDD' , margin: '15px'}}></img>
                </Link>                    

            </Card>
        </div>
    )
}

export const MemoizedUserCard = memo(UserCard)
