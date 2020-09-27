import React, { createContext } from 'react'

export const UserContext = createContext()

export const UserContextProvider = props => {
     console.log('Props', props.user)
     const user = props.user
    // const [user, setUser] = useState(props.user)
    // const UserContext = [user, setUser]
    // setUser(props.user)
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}

// export const UserContextProvider