import React, { useEffect, useState } from 'react'
import PaperDisplayCard from './PaperDisplayCard'
import { db } from '../../firebase'

function PaperDisplay({postID, username, researchGroupID}) {

    const [papers, setPapers] = useState([])

    useEffect(() => {

        db.collection('users')
        .doc(username)
        .collection('posts')
        .doc(postID)
        .collection('papers')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
        setPapers(snapshot.docs.map(doc => ({
            id: doc.id,
            paper: doc.data()
        })))
    })

    }, [papers, postID, researchGroupID, username])

    return (
        <div>
            {papers && papers.map(({paper, id}) => {                
                return <PaperDisplayCard key= { id } doi={ paper.doi } description={ paper.description } title={ paper.title }/>
            })}
        </div>
    )
}

export default PaperDisplay
