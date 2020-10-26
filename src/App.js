import React, { useState, useEffect } from 'react';
import './App.css';
import { auth } from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card } from '@material-ui/core';
import SignUpForm from './Components/SignUpForm';
import LogInForm from './Components/LogInForm';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Posts from './Components/posts/Posts'
import Profile from './Components/profile/Profile';
import { Link } from 'react-router-dom'
import { UserContextProvider } from './Contexts/UserContext'
import UserFeed from './Components/UserFeed';
import GroupFeed from './Components/group/GroupFeed'

const App = () => {
  
  const [openModal, setOpenModal] = useState(false)
  const [logIn, setLogin] = useState(true)
  const [modalStyle] = useState(getModalStyle)
  const [user, setUser] = useState(null)


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

  const linkStyles = {
    marginRight: '25px',
    color: '#FFF',
    textDecoration: 'none', 
    fontWeight: "bold"
  }  

  return (
    <Router>
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

      <UserContextProvider user={ user }>
        <div className="header">
          <Link to={'../'}>
            <img src="logo.png" alt="logo" className="headerLogo"></img>
          </Link>
          
          { user ?
          <div style={{  marginRight: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
            }}>
          
            <Link style={linkStyles} to="/">Feed</Link>
            <Link style={linkStyles} to="/profile">Profile</Link>
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

        <Switch>             
          <Route path='/' exact render={() => (
            <Posts />
          )}
          />
          <Route path='/profile' render={() => (
            <Profile />
          )}
          />
          <Route path='/group' render={() => (
            <GroupFeed />
          )}
          />
          <Route path='/users/:username' render={() => (
            <UserFeed />
          )}
          />
        </Switch>
      </UserContextProvider>    
    </div>
    </Router>
  );
}

export default App;
