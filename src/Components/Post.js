import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import '../Post.css'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card';
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

function Post({ postID, username, imgsrc, caption}) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe
        if(postID){
            unsubscribe = db.collection('posts')
                            .doc(postID)
                            .collection('comments')
                            .onSnapshot((snapshot) => {
                               setComments(snapshot.docs.map((doc) => doc.data()))
                                  })
        }

        return () => {
            unsubscribe()
        }
    }, [postID])

    const handleComment = (e) => {
        e.prevent.default()

        db.collection('posts')
          .doc(postID)
          .add({
              text: comment,
              username: ''
          })

    } 

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
                { comments ? comments.map((comment) => {
                    console.log(comment)
                    return (
                    <div>
                        <p>{ comment.username }</p>
                        <p>{ comment.text }</p>
                    </div>    
                    
                    )
                })
                : null
            }
            </div>
            <div>
                <form>
                    <input
                    type="text"
                    placeholder="Add comment"
                    value={ comment }
                    onChange={(e) => setComment(e.target.value)}
                    />
                    <button type="submit" onSubmit={ handleComment }>Add Comment</button>
                    
                </form>
            </div>
        </Card>
    )
}

export default Post
