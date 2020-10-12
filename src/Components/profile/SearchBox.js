import React from 'react'

function SearchBox({ handleChange, searchValue }) {
    return (
        <input type='search' onChange={ handleChange } 
               value= { searchValue } 
               placeholder='Search Collaborators' 
               style={{
                   marginBottom: '25px',
                   border: 'none',
                   outline: 'none',
                   padding: '0 5px',
                   width: '250px',
                   lineHeight: '30px',
                   }}>
        </input>
    )
}

export default SearchBox
