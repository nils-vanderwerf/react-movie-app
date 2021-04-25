import React from 'react'

const SearchBox = (props) => {
    return (
        <div className='col col-sm-12'>
            <input className="form-control" 
            placeholder="Type to search..."
            onChange={(event) => props.setQuery(event.target.value)}></input>
        </div>
    )
}

export default SearchBox;
