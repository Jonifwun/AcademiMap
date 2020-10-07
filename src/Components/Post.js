import React, { useState, useEffect, useContext } from 'react'
import { db } from '../firebase'
import '../Post.css'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import DropDownPostMenu from './DropDownPostMenu'
import CommentBox from './CommentBox';
import { UserContext } from '../Contexts/UserContext'

function Post({ postID, username, imgsrc, caption, researchGroupID }) {

    const [comments, setComments] = useState([])
    const [openComment, setOpenComment] = useState(false)
    const [userData, setUserData] = useState({})

    const user = useContext(UserContext)

    useEffect(() => {
        // let unsubscribe;
        if(postID && username && researchGroupID){
            // unsubscribe = () => {
                //Grab all of the comments from researchgroups collection
                db.collection('researchgroups')
                            .doc(researchGroupID)
                            .collection('posts')
                            .doc(postID)
                            .collection('comments')
                            .orderBy('timestamp', 'asc')
                            .onSnapshot((snapshot) => {
                               setComments(snapshot.docs.map(doc => ({
                                   id: doc.id,
                                   comment: doc.data()
                            })                          
                        ))
                    }) 
                
            // } 
            //Grab the user data for the individual post
            db.collection('users').doc(username).get()
            .then((userObj)=>{
                const data = userObj.data()
                setUserData(data)
            })     
        }
        // return (() => {
        //     unsubscribe()
        // })
    }, [postID, researchGroupID, username])

    console.log('Comments:', comments)

    const deleteComment = (commentID, commentUser) => {
        //this needs to be changed to posts on research group and user etc, not the posts collection
        if(user.displayName === commentUser){
            db.collection('researchgroups')
              .doc(researchGroupID)
              .collection('posts')
              .doc(postID)
              .collection('comments')
              .doc(commentID).delete().then(function() {
                    console.log("Document successfully deleted!");
            }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        }
    }

    const deletePost = () => {

        // db.collection('posts').doc(postID).delete().then(function() {
        //     console.log("Document successfully deleted!");
        // }).catch(function(error) {
        //     console.error("Error removing document: ", error);
        // });

        //Delete post from research group posts collection
        db.collection('researchgroups')
          .doc(researchGroupID)
          .collection('posts')
          .doc(postID)
          .delete()
          .then(()=>{
              console.log("Document successfully deleted!")
          }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

    }

    return (
        <Card id="postCard">
            <div className="post">
                <div className='postHeader'>
                    <div className="postUserAvatar">
                    <Avatar
                        className="postAvatar"
                        alt={ username }
                        src={ userData.photoURL }
                        style={{borderRadius: '80px', border: '3px solid #019CDD'}}
                    />
                    <h4>{ username }</h4>  
                    </div>
                    <DropDownPostMenu deletePost={ deletePost } postID={ postID }/>
                    
                </div>
                <img className="postImage" src={ imgsrc } alt="postimg"></img>
                <div className="icons">
                    <FavoriteTwoToneIcon className="icon"/>
                    <QuestionAnswerTwoToneIcon className ="icon" onClick={() => setOpenComment(!openComment) }/>
                </div>
                <h4 className="postText"><span className="username">{ username }</span> { caption }</h4>
                { comments ? comments.map(({comment, id}) => {
                    return (
                    <div className="commentDisplay" key={ id } >
                        <div style={{display: 'flex'}}>                           
                            <h5 className="commentUsername"><strong>{ comment.username }</strong></h5>
                            <h5 className="commentText">{ comment.text }</h5>
                        </div>
                        
                        { comment.username === user?.displayName ? <ClearSharpIcon className="icon" onClick={() => deleteComment(id, comment.username) }/> : null}

                    </div>    
                    )
                })
                : null
            }
            </div>
            <div>
                { user && openComment && (
                    <CommentBox postID={ postID } user={ user } researchGroupID={ researchGroupID }/>
                )}
            </div>
        </Card>
    )
}

export default Post
