import React, { useContext, useState, useEffect, useRef } from 'react'
import { Card } from '@material-ui/core'
import { UserContext } from '../Contexts/UserContext'
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone'
import InlineTextEdit from './InlineTextEdit'


function Bio({ collaborators, posts, userData }) {

    const user = useContext(UserContext)
    const [bioText, setBioText] = useState('')

    useEffect(()=> {
        setBioText(userData)
    }, [userData])

    const textareaRef = useRef()

    // const [inputValue, setInputValue] = useState('')
    // const [bioText, setBioText] = useState('')


    return (

        <Card style={{display: 'flex', flexDirection: "column", alignItems: "center", backgroundColor: '#164B61', color: '#FFF', padding: '15px 35px'}}>
            <SettingsTwoToneIcon 
            style={{
                position:'relative',
                top:'0px',
                right:'-150px',
                fontSize: '20px',
                cursor: 'pointer'
            }}
            />
            <h5>{user?.displayName }</h5>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', margin: '20px 50px'}}> 
                    {posts ? <h5>{ posts.length } posts</h5> : null}
                    {collaborators ? <h5>{ collaborators.length -1 } collaborators</h5> : null}
                    <h5>20 following</h5>
                            
                </div>
                <hr style={{width: '100%', margin: '15px'}}></hr>
                
                <label htmlFor="bioText" style={{alignSelf: 'start'}}><strong>Bio:</strong></label>
                {/* <p name="Bio" style={{width: '300px', textAlign: 'justify'}}>{userData.bio}</p> */}

            <InlineTextEdit 
                text={ userData.bio }
                type='textarea'
                childRef={ textareaRef }
            >
                <textarea
                    name="bioText"
                    rows="5"
                    value={ bioText }
                    style={{width: '300px', textAlign: 'justify'}}
                    onChange={e => setBioText(e.target.value)}
                />
            </InlineTextEdit>    

        </Card>
    )
}

export default Bio
