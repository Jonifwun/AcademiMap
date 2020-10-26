import { db } from "../../firebase"

export const postComment = (typeArr, {postID, comment}) => {
    typeArr.forEach(({type, id}) => {
        db.collection(type).doc(id)
            .collection('posts')
            .doc(postID)
            .collection('comments')
            .add(comment)
            .then(() => {
                console.log('Comment successfully added')
            })
            .catch(err => {
                console.log('Comment upload error:', err)
            })
    })
}