import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import React, { useEffect, useState } from 'react'


function CaptionEdit({ setOpenModal, caption }) {

    const [captionText, setCaptionText] = useState('')
    
    

    const updateCaption = () => {
        setOpenModal(false)
    }

    return (
        <div>
            <form>
                <h5>Edit Caption</h5>            
                <FormControl className="input">
                    <InputLabel htmlFor="caption">Caption</InputLabel>
                    <Input
                        type="text"
                        id="caption"
                        value={ captionText }
                        onChange={(e) => setCaptionText(e.target.value)}
                    />
                </FormControl>               
                <Button type="submit" onClick={() => updateCaption } style={{marginTop: '15px'}}variant="contained" color="primary" className="logInBtn">Submit</Button>
            </form>
        </div>
    )
}

export default CaptionEdit
