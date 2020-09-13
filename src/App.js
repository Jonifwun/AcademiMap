import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post'
import { db } from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card } from '@material-ui/core';

function App() {
  
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [modalStyle] = useState(getModalStyle)

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      }
      )))
    })  
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
      padding: theme.spacing(2, 4, 3),
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
                <h2 id="simple-modal-title">Sign Up</h2>
                <p id="simple-modal-description">
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
              </div>
          </Card>
           
  
      </Modal>


      <div className="header">
        <img src="logo.png" alt="logo" className="headerLogo"></img>
        <Button onClick={() => setOpenModal(true)}>Sign Up</Button>
      </div>
      {
        posts.map(({ post, id }) => (
          <Post username={ post.username } key={ id } caption={ post.caption } imgsrc={ post.imgsrc }/>
        ))
        
      }
      
     
    
    </div>
  );
}

export default App;
