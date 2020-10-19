import React from 'react'
import { Link } from 'react-router-dom'
import DropDownPostMenu from './DropDownPostMenu'
import Avatar from '@material-ui/core/Avatar'
import { db } from '../../firebase'

function PostHeader({username, user, postID, setOpenModal, userData, userFeedData, researchGroupID}) {

    const deletePost = () => {
        //Delete post from research group posts collection
        db.collection('researchgroups')
          .doc(researchGroupID)
          .collection('posts')
          .doc(postID)
          .delete()
          .then(()=>{
              console.log("Document successfully deleted!")
        }).catch(err => {
            console.error("Error removing document: ", err);
        });

        //Delete post from individual user posts collection
        db.collection('users')
          .doc(username)
          .collection('posts')
          .doc(postID)
          .delete()
          .then(()=>{
            console.log("Document successfully deleted!")
        }).catch(err => {
          console.error("Error removing document: ", err);
        });
    }
    return (
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
            { username === user.displayName ? 
            <DropDownPostMenu 
            deletePost={ deletePost } 
            postID={ postID } 
            setOpenEditCaption={ setOpenModal }
            />
            : null }
        </div>
    )
}

export default PostHeader
