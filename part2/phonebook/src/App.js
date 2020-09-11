import React, { useState } from 'react';

const App = (props) => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [ newName, setNewName ] = useState('')

    const handleNameOnChange = (event) =>{
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        const person2add = {
            name: newName
        }
        // add into persons
        setPersons(persons.concat(person2add))
    }

    return (
        <>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                name: <input value={newName}
                    onChange={handleNameOnChange}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
            <div>debug: {newName}</div>
            <h2>Numbers</h2>
            {persons.map(p => <div>{p.name}</div>)}
        </>
    )
}

export default App;
