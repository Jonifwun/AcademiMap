import { Button, Card, Modal } from '@material-ui/core'
import React, { useState, memo } from 'react'
import JoinGroupForm from './JoinGroupForm'
import CreateGroupForm from './CreateGroupForm'
import { makeStyles } from '@material-ui/core/styles';

function Group({ buttonStyle, researchGroup }) {
   
    const [joinGroup, setJoinGroup] = useState(true)
    const [passcodeDisplay, setPasscodeDisplay] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [modalStyle] = useState(getModalStyle)

    function getModalStyle() {
        const top = 50
        const left = 50
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      };
      
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
        padding: '15px 30px'
    }

    return (
        <div>
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
                <div style={ groupStyles }>
                    <h3>Research Group:</h3>
                    <h5 style={{margin: '20px'}}><em>{researchGroup.groupName}</em></h5>
                    <p style={{width: '300px', textAlign: 'justify'}}>
                        Updates: 
                        {//HAVE THIS AS EDIT IN PLACE TEXT TOO (IF GROUP LEADER) - DYNAMICALLY SHOWN 
}
                        { researchGroup.groupUpdates }                
                    </p>             
                </div>
                <hr style={{width: '100%'}}></hr>
                <div style={{display: 'flex'}}>
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
        </div>
    )
}

export const MemoizedGroup = memo(Group)
