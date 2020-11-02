import React, { createContext } from 'react'

export const ResearchGroupContext = createContext()

export const ResearchGroupContextProvider = props => {
    
     const researchGroupID = props.researchGroupID
   
    return (
        <ResearchGroupContext.Provider value={researchGroupID}>
            {props.children}
        </ResearchGroupContext.Provider>
    )
}