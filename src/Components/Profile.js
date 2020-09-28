import React, { useContext, useEffect, useState } from 'react'
import { Card } from '@material-ui/core'
import Bio from './Bio'
import UserCard from './UserCard'
import { UserContext } from '../Contexts/UserContext'
import Group from './Group'
import { db } from '../firebase'
import ProfilePic from './ProfilePic'


function Profile() {

    const user = useContext(UserContext)
    
    const [researchGroup, setResearchGroup] = useState({})
    const [searchValue, setSearchValue] = useState('')
    
    const handleChange = (e) => {
        e.preventDefault()
        setSearchValue(e.target.value)
    }

    useEffect(() => { 
        try {
             //Match the users id to any groups
            db.collection('researchgroups').where('groupmembers', 'array-contains', user.uid).get()
            .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data())
                //set the research group to state
                const res = doc.data()
                setResearchGroup(res)
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        } catch (err){
            console.log(err)
        }
        
    }, [user])

    // const filteredCollaborators = collaborators.filter(user => 
    //         user.displayName.toLowercase().includes(searchValue.toLowerCase())
    //     )

    const buttonStyle = { color: '#FFF', backgroundColor: '#019CDD', margin: '25px'}

    return (
        <div>
            <Card style={{margin: '100px 30px 40px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>

                <ProfilePic buttonStyle={ buttonStyle }/>    
                <Bio />
                <Group buttonStyle={ buttonStyle } researchGroup={ researchGroup }/>


                </div>
            </Card>
            <Card style={{margin: '0 30px 30px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <input type='search' onChange={ handleChange } value= { searchValue } placeholder='Search Collaborators' style={{marginBottom: '25px'}}></input>
                
                    { researchGroup?.groupmembers ?
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%'}}>

                        { 
                            researchGroup.groupmembers.map((member) => (
                                <div>
                                <UserCard key={member.id} user={member}/>
                                </div>
                            ))
                        }
                        </div> 
                        : null   
         
                    }  

                </div>
            </Card>
        </div>
    )
}

export default Profile
