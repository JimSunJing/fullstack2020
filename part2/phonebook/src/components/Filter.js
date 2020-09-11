import React from 'react';

const Filter = ({searchKey, setSearchKey}) => {

    
    const handleSearchOnChange = (event) => {
        console.log(event.target.value)
        setSearchKey(event.target.value)
    }
    
    return (
        <div>filter shown with  
            <input value={searchKey} 
                onChange={handleSearchOnChange}/>
        </div>
    );
};

export default Filter;