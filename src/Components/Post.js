import React from 'react'
import '../Post.css'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card';
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';




function Post({ username, imgsrc, caption}) {
    return (
        <Card id="postCard">
            <div className="post">
                <div className='postHeader'>
                    <div className="postUserAvatar">
                       <Avatar
                        className="postAvatar"
                        alt={ username }
                        src="/static/images/avatar/1.jpg"
                    />
                    <h4>{ username }</h4>  
                    </div>
                   
                    <MenuTwoToneIcon id="menuIcon"/>
                </div>
                <img className="postImage" src={ imgsrc } alt="postimg"></img>
                <div className="icons">
                    <FavoriteTwoToneIcon className="icon"/>
                    <QuestionAnswerTwoToneIcon />
                </div>
                <h5 className="postText"><span className="username">{ username }</span> { caption }</h5>
            </div>
        </Card>
    )
}

export default Post
