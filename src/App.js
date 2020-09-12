import React from 'react';
import './App.css';
import Post from './Components/Post'

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src="logo.png" alt="logo" className="headerLogo"></img>
      </div>
      <Post />
    </div>
  );
}

export default App;
