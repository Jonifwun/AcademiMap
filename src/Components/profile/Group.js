import { Button, Card, Modal } from '@material-ui/core'
import React, { useState, useEffect, memo, useRef } from 'react'
import JoinGroupForm from './JoinGroupForm'
import CreateGroupForm from './CreateGroupForm'
import { makeStyles } from '@material-ui/core/styles'
import InlineTextEdit from '../InlineTextEdit'
import './Editable.css'
import { db } from '../../firebase'

const Group = ({ buttonStyle, researchGroup, userData }) => {
   
    const [joinGroup, setJoinGroup] = useState(true)
    const [passcodeDisplay, setPasscodeDisplay] = useState(false)
    const [groupUpdatesText, setGroupUpdatesText] = useState('')
    const [editing, setEditing] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    

    const textareaRef = useRef()

    useEffect(()=> {
       
        setGroupUpdatesText(researchGroup?.groupUpdates)
        
    }, [researchGroup])

    const updateGroupUpdates = () => {
        db.collection('researchgroups').doc(userData.researchGroup).update({
            groupUpdates: groupUpdatesText
        }).then(()=> {
            console.log('Bio updated!')
        }).catch((err) => {
            console.log(err)
        })
    }

    const getModalStyle = () => {
        const top = 50
        const left = 50
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      };
    
    const [modalStyle] = useState(getModalStyle)
      
    const useStyles = makeStyles((theme) => ({
        paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: '#164B61',
        color: '#FFF',
        borderRadius: 5,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
        },
    }));
    
    const classes = useStyles();

    const groupStyles = {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#164B61',
        color: '#FFF',
        padding: '10px 25px',
        width: '350px',
        height: '275px'
    }

    return (
        <React.Fragment>
            <Modal
            open={ openModal }
            onClose={() => setOpenModal(false)}
            >     
            <Card>
                <div style={ modalStyle } 
                className={ classes.paper }
                >
                    { joinGroup ? 
                    <JoinGroupForm setOpenModal={ setOpenModal }/>
                    :
                    <CreateGroupForm setOpenModal={ setOpenModal }/> 
                }
                </div>
            </Card>
            </Modal>


        { researchGroup.groupName ?
            <Card style={ groupStyles }> 
            
                    <h5>Research Group:</h5>
                    <h5 style={{margin: '5px 20px'}}><em>{researchGroup.groupName}</em></h5>

                    <label htmlFor="groupUpdates" style={{alignSelf: 'start', marginBottom: '10px'}}><strong>Updates</strong>
                        { researchGroup ? <small> - ({editing ? 'Editing' : 'Click to edit'})</small> : null}
                    </label>
                    
                    <div>
                        <InlineTextEdit 
                            text={ groupUpdatesText }
                            type='textarea'
                            childRef={ textareaRef }
                            updateText={ updateGroupUpdates }
                        >       
                            <textarea
                                name="groupUpdates"
                                placeholder="Add update..."
                                rows='5'
                                cols='5'
                                value={ groupUpdatesText }
                                style={{width: '300px', resize: 'none', border: 'none'}}
                                className='Editable'
                                onChange={(e) => setGroupUpdatesText(e.target.value)}
                                autoFocus={true}
                                onFocus={() => setEditing(true)}
                                onBlur={() => setEditing(false)}
                            />
                        </InlineTextEdit>
                    </div>
                
                <div style={{width: '100%', alignSelf: 'flex-end'}}>
                <hr style={{width: '100%'}}></hr>
                    <div style={{display: 'flex', justifyContent: "center"}}>
                        <Button style={ buttonStyle } onClick={() => setPasscodeDisplay(!passcodeDisplay)}>
                            {passcodeDisplay ? 'Hide Passcode' : 'Show Passcode'}
                        </Button>
                        {passcodeDisplay ? 
                            <div style={{display: 'flex', flexDirection: 'column', marginTop: '5px',backgroundColor: '#0D3140', borderRadius: '5px', padding:'7px', fontSize: '13px', alignItems: 'center'}}>
                                <p><em>Group Passcode: { researchGroup.groupPasscode }</em></p>
                                <br></br>
                                <p>Give this passcode to any user<br></br> 
                                    you wish to join the group</p>
                            </div> 
                            : null}                    
                    </div>
                </div>
            </Card>
            : 
            <Card style={ groupStyles }>
                <p>You are currently not part of any research groups</p>
                <hr style={{color: '#FFF', width: '100%'}}></hr>
                <Button style={ buttonStyle } onClick={() => {
                    setOpenModal(true)
                    setJoinGroup(true)
                }}>Join Group</Button>
                <Button style={ buttonStyle } onClick={() => {
                    setOpenModal(true)
                    setJoinGroup(false)
                }}>Create Group</Button>
            </Card>
            }  
        </React.Fragment>
    )
}

export const MemoizedGroup = memo(Group)
