import React, { useState } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = (props) => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [number, setNumber] = useState('')
    const [searchKey, setSearchKey] = useState('')

    return (
        <>
            <h2>Phonebook</h2>

            <Filter searchKey={searchKey} setSearchKey={setSearchKey} />

            <h3>add a new ppl</h3>
            
            <PersonForm newName={newName} setNewName={setNewName}
                number={number} setNumber={setNumber}
                persons={persons} setPersons={setPersons} />

            <h2>Numbers</h2>
            <Persons persons={persons} searchKey={searchKey} />
        </>
    )
}

export default App;
