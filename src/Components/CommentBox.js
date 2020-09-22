import React, { useState } from 'react'
import firebase from 'firebase'
import { db } from '../firebase'

function CommentBox({postID, user}) {

    const [comment, setComment] = useState('')

    const postComment = (e) => {
        e.preventDefault()
        db.collection('posts')
          .doc(postID)
          .collection('comments')
          .add({
              text: comment,
              username: user.displayName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })

          setComment('')

    } 

    return (
        <form className="commentBox">
            <input
                className="commentInput"
                type="text"
                placeholder="Add comment"
                value={ comment }
                onChange={(e) => setComment(e.target.value)}
            />            
            <button
                className="commentBtn" 
                type="submit" 
                onClick={ postComment } 
                disabled={!comment}
            >
            Post
            </button>                
        </form>
    )
}

export default CommentBox
