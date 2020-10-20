import React, { useState } from 'react'
import { Card, FormControl, InputLabel, OutlinedInput } from '@material-ui/core'

function AddPaperCard({setAddPaperDisplay}) {

    const [title, setTitle] = useState('')
    const [doi, setDoi] = useState('')
    const [description, setDescription] = useState('')

    const handleClick = () => {
        setAddPaperDisplay(false) 
    }

    const inputStyle = {
        margin: '15px 5px',
        color: '#FFF'
    }

    return (
        <Card style={{backgroundColor: '#009DDC', marginBottom: '20px', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h5 style={{marginTop: '5px'}}>Add Paper</h5>
            <form autocomplete='off' style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="title" style={{color: "#FFF"}}>Title</InputLabel>
                    <OutlinedInput id="title" value={title} onChange={(e) => setTitle(e.target.value)} label="Name" style={inputStyle} />
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="doi" style={{color: "#FFF"}}>DOI</InputLabel>
                    <OutlinedInput id="doi" value={doi} onChange={(e) => setDoi(e.target.value)} label="Name" style={inputStyle}/>
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="component-outlined" style={{color: "#FFF"}}>Description</InputLabel>
                    <OutlinedInput id="description" value={description} onChange={(e) => setDescription(e.target.value)} label="Name" style={inputStyle} />
                </FormControl>
            </form>
            
            <button onClick={ handleClick } style={{marginBottom: '3px', outline: 'none', border: 'none', backgroundColor: '#009DDC', color: '#FFF', cursor: 'pointer'}}><h5>x</h5> close</button>
        </Card>
    )
}
export default AddPaperCard
