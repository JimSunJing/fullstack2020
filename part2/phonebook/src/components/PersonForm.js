import React from 'react';

const PersonForm = (props) => {

    const { newName, setNewName,
        number, setNumber, addName } = props

    const handleNameOnChange = (event) => {
        // console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberOnChange = (event) => {
        // console.log(event.target.value)
        setNumber(event.target.value)
    }

    return (
        <div>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName}
                        onChange={handleNameOnChange} /></div>
                <div>number: <input value={number}
                    onChange={handleNumberOnChange} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;