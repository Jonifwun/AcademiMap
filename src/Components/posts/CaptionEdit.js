import { Button, FormControl, Input } from '@material-ui/core'
import React, { useState } from 'react'
import { db } from '../../firebase'
import { updateCaption } from './updateCaption'


const CaptionEdit = ({ setOpenModal, username, caption, postID, researchGroupID }) => {

    const [captionText, setCaptionText] = useState(caption)

    const handleUpdate = (e) => {
    e.preventDefault();
    
    updateCaption([{type: 'users', id: username}, {type: 'researchgroups', id: researchGroupID}], postID, captionText)
    

        db.collection('users')
          .doc(username)
          .collection('posts')
          .doc(postID)
          .update({
              caption: captionText
          })
          .then(() => {
            console.log("Caption successfully updated!");
            setOpenModal(false)
          })
          .catch(err => {
            console.error("Error updating caption: ", err);
          })
          
        db.collection('researchgroups')
          .doc(researchGroupID)
          .collection('posts')
          .doc(postID)
          .update({
              caption: captionText
          })
          .then(() => {
            console.log("Caption successfully updated!");
            setOpenModal(false)
          })
          .catch(err => {
            console.error("Error updating caption: ", err);
          })
    }

    return (
        <div>            
          <h5>Edit Caption</h5>            
          <FormControl className="input">
              <Input
                  style={{color: '#FFF'}}
                  type="text"
                  id="caption"
                  value={ captionText }
                  onChange={(e) => setCaptionText(e.target.value)}
              />
          </FormControl>               
          <Button type="submit" onClick={ handleUpdate } style={{marginTop: '15px'}} variant="contained" color="primary" className="logInBtn">Submit</Button>            
        </div>
    )
}

export default CaptionEdit
