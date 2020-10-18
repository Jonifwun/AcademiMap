import React, { createContext } from 'react'

export const UserContext = createContext()

export const UserContextProvider = props => {
    
     const user = props.user
   
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}
