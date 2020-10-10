import React, { useContext, useState, useEffect, useRef } from 'react'
import { Avatar, Card } from '@material-ui/core'
import { UserContext } from '../Contexts/UserContext'
import InlineTextEdit from './InlineTextEdit'
import '../Editable.css'
import { db } from '../firebase'


function Bio({ collaborators, posts, userData }) {

    const user = useContext(UserContext)
    const [bioText, setBioText] = useState('')

    useEffect(()=> {
        setBioText(userData.bio)
    }, [userData])

    const textareaRef = useRef()

    const updateBio = () => {
         //Update bio in db
         db.collection('users').doc(user.displayName).update({
            bio: bioText
        }).then(()=> {
            console.log('Bio updated!')
        }).catch((err) => {
            console.log(err)
        })
    }

    // const [inputValue, setInputValue] = useState('')
    // const [bioText, setBioText] = useState('')


    return (

        <Card style={{display: 'flex', flexDirection: "column", alignItems: "center", backgroundColor: '#164B61', color: '#FFF', padding: '15px 25px', width: '350px', height: '275px'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', marginRight: "15px"}}>
                    <Avatar
                        alt={ user.displayName }
                        src={ user.photoURL }
                        style={{marginRight: '10px', borderRadius: '80px', border: '3px solid #019CDD'}}
                    />
                    <h5>{user?.displayName }</h5>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#0D3140', borderRadius: '5px', padding:'7px', fontSize: '13px', alignItems: 'start'}}>
                    <p>Affiliation: { userData.affiliation }</p>
                    <p>Position: { userData.position }</p>
                    <p>Location: { userData.location }</p>

                </div>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', margin: '20px 50px'}}> 
                {posts ? <h5>{ posts } posts</h5> : null}
                {collaborators ? <h5>{ collaborators.length -1 } collaborators</h5> : null}
                <h5>20 following</h5>                        
            </div>
            <hr style={{width: '100%', margin: '10px'}}></hr>
                
            <label htmlFor="bioText" style={{alignSelf: 'start', marginBottom: '10px'}}><strong>Bio</strong><small> - (Click to edit)</small></label>

            <InlineTextEdit 
                text={ bioText }
                type='textarea'
                childRef={ textareaRef }
                updateBio={ updateBio }
            >
                <textarea
                    name="bioText"
                    placeholder="Add bio"
                    rows='5'
                    cols='5'
                    value={ bioText }
                    style={{width: '300px', resize: 'none', border: 'none'}}
                    className='Editable'
                    onChange={(e) => setBioText(e.target.value)}
                    autoFocus={true}
                />
            </InlineTextEdit>    
        </Card>
    )
}

export default Bio
