import React, { useState } from 'react'

function InlineTextEdit() {

    const props = 'Henlo'

    const [isEditing, setIsEditing] = useState(false)

    return (
    <section>
        {isEditing ? (
            <div
                onBlur={() => setIsEditing(false)}
                onKeyDown={e => handleKeyDown(e, type)}
            >
            {children}
            </div>
        ) : (
            <div
            onClick={() => setIsEditing(true)}
            >
            <span>
                { props }
            </span>
            </div>
      )}
    </section>
  );

    
}

export default InlineTextEdit
