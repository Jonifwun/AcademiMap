import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post'
import { db } from './firebase'

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })  
  }, [])

  return (
    <div className="App">
      <div className="header">
        <img src="logo.png" alt="logo" className="headerLogo"></img>
      </div>
      {
        posts.map(post => (
          <Post username={ post.username } caption={ post.caption } imgsrc={ post.imgsrc }/>
        ))
        
      }
      
     
    
    </div>
  );
}

export default App;
