import { Button, Card, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import JoinGroupForm from './JoinGroupForm'
import CreateGroupForm from './CreateGroupForm'
import { makeStyles } from '@material-ui/core/styles';

function Group({ buttonStyle, researchGroup }) {

    const [joinGroup, setJoinGroup] = useState(true)
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

    // const handleJoinGroup = () => {

    // }

    // const handleCreateGroup = () => {

    // }

    const groupStyles = {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#164B61',
        color: '#FFF',
        padding: '15px 35px'
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


        { researchGroup ?
            <Card style={ groupStyles }> 
                <div style={ groupStyles }>
                    <h3>Research Group:</h3>
                    <h5 style={{margin: '20px'}}><em>{researchGroup.groupName}</em></h5>
                    <p style={{width: '300px', textAlign: 'justify'}}>
                        Updates: 
                        Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Diam quam nulla porttitor massa id neque aliquam.                 
                    </p>             
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

                {
                    // For Create Group. need logic to create research group by name and give a reference value for joining. 

                }
            </Card>
            }  
        </div>
    )
}

export default Group
