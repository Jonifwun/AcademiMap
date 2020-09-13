import React, { useState } from 'react';
import './App.css';
import Post from './Components/Post'

function App() {
  const [posts, setPosts] = useState([ {
    username: "jonnyday_", 
    imgsrc: "https://www.freecodecamp.org/news/content/images/size/w600/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png", 
    caption: "This is a caption"
  },
  {
    username: "jonifwun", 
    imgsrc: "https://www.freecodecamp.org/news/content/images/size/w600/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png", 
    caption: "This is a caption"
  },
  {
    username: "jpd", 
    imgsrc: "https://www.freecodecamp.org/news/content/images/size/w600/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png", 
    caption: "This is a caption"
  }]);

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
