import { db } from '../../firebase'

export const updateCaption = (typeArr, postID, captionText, setOpenModal) => {   
        typeArr.forEach(({type, id}) => {
          db.collection(type)
            .doc(id)
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
        })    
}