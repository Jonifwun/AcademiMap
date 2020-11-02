import { db } from "../firebase"


export const GetMorePosts = ({collection, id, setPosts, lastVisible, setHasMore, setLoading, setLastVisible}) => {

    setLoading(true)
        try {
        db.collection(collection)
        .doc(id)
        .collection('posts')
        .orderBy('timestamp', 'desc')
        .startAfter(lastVisible)
        .limit(2)              
        .onSnapshot(snapshot => {
            const lastVisible = snapshot.docs[snapshot.docs.length-1]
            if(snapshot.docs.length === 0) setHasMore(false)
            if(lastVisible) setLastVisible(lastVisible)
            const newPosts = snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
            }))
            setPosts(prevPosts => {
            return [...prevPosts, ...newPosts]
            })
            setLoading(false)
        })
        } catch (err) {
        if(err) console.log('getMorePosts error:', err)
        }   
}  