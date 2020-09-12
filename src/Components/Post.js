import React from 'react'
import '../Post.css'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card';


function Post() {
    return (
        <Card id="postCard">
            <div className="post">
                <div className='postHeader'>
                    <Avatar
                        className="postAvatar"
                        alt='Avatar'
                        src="/static/images/avatar/1.jpg"
                    />
                    <h4>Username</h4>
                </div>
                <img className="postImage" src="https://www.freecodecamp.org/news/content/images/size/w600/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" alt="postimg"></img>
                <h5 className="postText"><span className="username">Username</span> Caption</h5>
            </div>
        </Card>
    )
}

export default Post
