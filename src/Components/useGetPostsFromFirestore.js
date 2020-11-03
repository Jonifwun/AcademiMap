import { useEffect, useState } from 'react'
import { db } from '../firebase'

export const useGetPostsFromFirestore = ({collection, id}) => {

    const [data, setData] = useState([])
    const [initialLastVisible, setLastVisible] = useState(null)
    const [error, setError] = useState(null)
    const [dataLoading, setDataLoading] = useState(false)

    useEffect(() => {
        try {
            db.collection(collection).doc(id)
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .limit(2)
            .onSnapshot(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length-1]
                setLastVisible(lastVisible)    
                setData(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
                }
            )))
            })
            setDataLoading(false)
        } 
        catch (err) {
            if(error) setError('Error fetching posts:', err)
        } 
    }, [id, collection, error])

    return {
        data,
        initialLastVisible,
        dataLoading,
        error
    }
}
