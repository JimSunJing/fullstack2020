import React from 'react';

const PersonForm = (props) => {

    const {persons,setPersons,
        newName,setNewName,
        number,setNumber} = props

    const handleNameOnChange = (event) =>{
        // console.log(event.target.value)
        setNewName(event.target.value)
    }
    
    const handleNumberOnChange = (event) => {
        // console.log(event.target.value)
        setNumber(event.target.value)
    }
    
    const addName = (event) => {
        event.preventDefault()
        const person2add = {
            name: newName,
            number: number
        }
        // check if name already excist
        // console.log('find:',persons.find(p => p.name === newName))
        if (persons.find(p => p.name === newName) !== undefined){
            console.log('find a name repeat')
            alert(`${newName} is already added to phonebook`)
            return 
        }
        // check phone number exsist
        if (persons.find(p => p.number === number) !== undefined){
            console.log('find a number repeat')
            alert(`${number} is already added to phonebook`)
            return 
        }
        // add into persons
        setPersons(persons.concat(person2add))
    }

    return (
        <div>
            <form onSubmit={addName}>
                <div>
                name: <input value={newName}
                    onChange={handleNameOnChange}/></div>
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