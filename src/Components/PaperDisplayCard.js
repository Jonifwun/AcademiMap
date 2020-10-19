import React from 'react'
import { Card } from '@material-ui/core'

function PaperDisplayCard({ doi, description, title}) {

    return (
        <Card style={{padding: '5px', margin: '5px 10px', backgroundColor: '#174B61', color: '#FFF'}}> 
            <h5><em>{ title }</em></h5>
            <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer" style={{color: "#FFF"}}><h5>DOI: { doi }</h5></a>
            <p>{ description }</p>
        </Card>
    )
}

export default PaperDisplayCard
