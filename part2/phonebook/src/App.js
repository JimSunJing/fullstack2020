import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = (props) => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [number, setNumber] = useState('')
    const [searchKey, setSearchKey] = useState('')

    useEffect(() => {
        console.log('effect...')
        axios.get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    },[])

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
