import React, { useState, useEffect } from 'react'

function InlineTextEdit({childRef, text, type, children }) {

    const [isEditing, setIsEditing] = useState(false)

    useEffect(()=>{
        if(childRef && childRef.current && isEditing === true){
            
            childRef.current.focus()
        }
    }, [isEditing, childRef])

    const handleKeyDown = (e, type) => {
        //Grab the key from the event first
        const { key } = e
        const keys = ['Escape', 'Tab']
        const enterKey = 'Enter'
        const allKeys = [...keys, enterKey]
        //The keys are split so that in textarea, enter creates new line
        if((type === 'textarea' && keys.indexOf(key) > -1) ||
        (type !== 'textarea' && allKeys.indexOf(key) > -1)){
            //If any of these keys is pressed, state set to false (-1 means not found)
            setIsEditing(false)
        }
    }

    return (
    <section>
        {isEditing ? (
            <div
            //Click away from text, editing is set to false
                onBlur={() => setIsEditing(false)}
                onKeyDown={e => handleKeyDown(e, type)}
            >
            { children }
            </div>
        ) : (
            <div
            //If this div is clicked on, allow editing
            onClick={() => setIsEditing(true)}
            >
            <span>
                { text }
            </span>
            </div>
      )}
    </section>
  );

    
}

export default InlineTextEdit
