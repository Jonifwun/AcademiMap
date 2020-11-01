import React, { useState } from 'react'

const useGetPostsFromFirestore = ({collection, id}) => {

    const [posts, setPosts] = useState([])
    const [lastVisible, setLastVisible] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        try {
            db.collection(collection).doc(id)
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .limit(4)
            .onSnapshot(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length-1]
                setLastVisible(lastVisible)    
                setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
                }
            )))
            })
            setLoading(false)
        } 
        catch (err) {
            error && setError('Error fetching posts:', err)
        } 
    }, [researchGroupID])

    return {
        lastVisible,
        posts,
        loading,
        error
    }
}
