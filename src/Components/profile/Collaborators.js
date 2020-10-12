import React, { useState } from 'react'
import { MemoizedUserCard } from '../UserCard'
import SearchBox from './SearchBox'

function Collaborators({ collaborators }) {

    const [searchValue, setSearchValue] = useState('')

    const handleChange = (e) => {
        e.preventDefault()
        setSearchValue(e.target.value)

    }

    const filteredCollaborators = collaborators.filter(member => 
        member.toLowerCase().includes(searchValue.toLowerCase())
    )
      
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <SearchBox handleChange={ handleChange } searchValue={ searchValue } />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%'}}>
                
                        {filteredCollaborators.length ? 
                            filteredCollaborators.map((member) => (
                                <MemoizedUserCard key={ member } username={ member }/>
                            ))
                         : 
                            <p>No users found</p>
                        }
            </div> 
        </div>
    )
}

export default Collaborators
