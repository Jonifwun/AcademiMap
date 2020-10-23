import React, { useEffect, useState } from 'react'
import PaperDisplayCard from './PaperDisplayCard'
import { db } from '../../firebase'
import { Card } from '@material-ui/core'

function PaperDisplay({postID, username, researchGroupID, setPaperDisplay}) {

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

    const handleClick = () => {
        setPaperDisplay(false) 
    }

    return (
        <Card style={{backgroundColor: '#009DDC', marginBottom: '20px', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h5 style={{marginTop: '5px'}}>Papers</h5>
            {papers && papers.map(({paper, id}) => {                
                return <PaperDisplayCard key= { id } {...paper}/>
            })}
            <button onClick={ handleClick } style={{marginBottom: '3px', outline: 'none', border: 'none', backgroundColor: '#009DDC', color: '#FFF', cursor: 'pointer'}}>close</button>
        </Card>
    )
}

export default PaperDisplay
