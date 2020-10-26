import React, { useState } from 'react'
import { Button, Card, FormControl, TextField } from '@material-ui/core'


const AddPaperCard = ({setAddPaperDisplay, setSubmitNewPaperDisplay}) => {
    
    const [doi, setDoi] = useState('')
    
    const handleClose = () => {
        setAddPaperDisplay(false) 
    }

    const submitDOI = (doi) => {
        setAddPaperDisplay(false)
        setSubmitNewPaperDisplay(true)
    }
    

    const inputStyle = {
        margin: '15px 25px',
        color: '#FFF',
    }

    return (
        <Card style={{backgroundColor: '#009DDC', marginBottom: '20px', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h5 style={{marginTop: '5px'}}>Add Paper</h5>
            <form autoComplete='off' style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                {/* <FormControl variant="outlined">

                    <TextField id="title" value={ title } onChange={(e) => setTitle(e.target.value)} label="Title" style={inputStyle} />
                </FormControl> */}

                <FormControl variant="outlined">
                    
                    <TextField value={ doi } onChange={(e) => setDoi(e.target.value)} label="DOI" style={inputStyle}/>
                </FormControl>
                
                <Button onClick={ submitDOI(doi) } style={{color: '#FFF', backgroundColor: '#0582b3', margin: '25px 0'}}>Submit</Button>
            </form>
            
            <button onClick={ handleClose } style={{marginBottom: '3px', outline: 'none', border: 'none', backgroundColor: '#009DDC', color: '#FFF', cursor: 'pointer'}}>close</button>
        </Card>
    )
}
export default AddPaperCard
