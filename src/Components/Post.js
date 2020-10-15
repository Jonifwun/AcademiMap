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
import { Link } from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import CaptionEdit from './CaptionEdit' 
import { makeStyles } from '@material-ui/core';

function Post({ postID, username, imgsrc, caption, researchGroupID, userFeedData }) {

    const [comments, setComments] = useState([])
    const [openComment, setOpenComment] = useState(true)
    const [userData, setUserData] = useState({})
    const [openModal, setOpenModal] = useState(false)


    const user = useContext(UserContext)

    useEffect(() => {
      
        if(postID && username && researchGroupID){            
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
            //Grab the user data for the individual post
            if(!userFeedData){

                db.collection('users').doc(username).get()
                .then((userObj)=>{
                    const data = userObj.data()
                    setUserData(data)
                })     
            }
        }
    }, [postID, researchGroupID, username, userFeedData])

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

        //Delete post from individual user posts collection
        db.collection('users')
          .doc(username)
          .collection('posts')
          .doc(postID)
          .delete()
          .then(()=>{
            console.log("Document successfully deleted!")
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
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
        <div>
            <Modal
            open={ openModal }
            onClose={() => setOpenModal(false)}
            >     
            <Card>
                <div 
                style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} className={ classes.paper }
                >
                    <CaptionEdit setOpenModal={ setOpenModal }/> 
                
                </div>
            </Card>
            </Modal>
            <Card id="postCard">
                <div className="post">
                    <div className='postHeader'>
                        <div className="postUserAvatar">
                        <Link to={`/users/${username}`}>   
                            <Avatar
                                className="postAvatar"
                                alt={ username }
                                src={ userFeedData ? userFeedData.photoURL : userData.photoURL }
                                style={{borderRadius: '80px', border: '3px solid #019CDD'}}
                            />
                        </Link> 
                        <h4>{ username }</h4>  
                        </div>
                        <DropDownPostMenu deletePost={ deletePost } postID={ postID } setOpenEditCaption={ setOpenModal }/>
                        
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
        </div>
    )
}

export default Post
