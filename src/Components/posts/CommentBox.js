import React, { useState } from 'react'
import firebase from 'firebase'
import { postComment } from './postComment'

const CommentBox = ({ postID, user, researchGroupID }) => {

    const [commentText, setComment] = useState('')

    const handleClick = (e) => {
        e.preventDefault()

        const comment = {
            text: commentText,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        
        postComment([{type: 'users', id: user.displayName}, {type: 'researchgroups', id: researchGroupID}], {postID, comment})
        setComment('')
    } 

    return (
        <form className="commentBox">
            <input
                className="commentInput"
                type="text"
                placeholder="Add comment"
                value={ commentText }
                onChange={(e) => setComment(e.target.value)}
            />            
            <button
                className="commentBtn" 
                type="submit" 
                onClick={ handleClick } 
                disabled={!commentText}
            >
            Post
            </button>                
        </form>
    )
}

export default CommentBox
