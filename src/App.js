import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post'
import { db, auth } from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card } from '@material-ui/core';
import SignUpForm from './Components/SignUpForm';
import LogInForm from './Components/LogInForm';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import Upload from './Components/Upload'

function App() {
  
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [logIn, setLogin] = useState(true)
  const [modalStyle] = useState(getModalStyle)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      }
      )))
    })  
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser){
          console.log(authUser)
          setUser(authUser)
        } else {
          setUser(null)
        }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  function getModalStyle() {
    const top = 50
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
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
   
  const classes = useStyles()

  return (
    <div className="App">
      <Modal
        open={ openModal }
        onClose={() => setOpenModal(false)}
      >     
          <Card>
            
              <div style={ modalStyle } className={ classes.paper }>
                { logIn ? 
                <LogInForm setOpenModal={ setOpenModal }/>
                :
                <SignUpForm setOpenModal={ setOpenModal }/> 
              }
              </div>
          </Card>
      </Modal>


      <div className="header">
        <img src="logo.png" alt="logo" className="headerLogo"></img>
        { user ?
        <div className="logInContainer">
          <p className="loggedInDisplay"> Signed in as { user.displayName }</p> 
          <Button className="logInBtns" onClick={() => auth.signOut()}><ExitToAppTwoToneIcon/>Log Out</Button>
        </div>
        :
        <div className="logInContainer">
          <Button className="logInBtns" onClick={() => {
            setOpenModal({open: true})
            setLogin(true)
          }}><LockOpenTwoToneIcon/>Log In</Button>

          <Button className="logInBtns" onClick={() => {
            setOpenModal({open: true})
            setLogin(false)
          }}><CreateTwoToneIcon/>Sign Up</Button>
        </div>
        }
        
      </div>
      <div className="posts">
        {
          posts.map(({ post, id }) => (
                  //the post belongs to this username
            <Post username={ post.username }
                  //this is the signed in user 
                  user={ user } 
                  key={ id } 
                  postID={ id } 
                  caption={ post.caption } 
                  imgsrc={ post.imgsrc }
                  />
                  
          ))
          
        }
      </div>
      
      
      { user?.displayName ? <Upload username={ user.displayName }/> : null }
      
      
     
    
    </div>
  );
}

export default App;
