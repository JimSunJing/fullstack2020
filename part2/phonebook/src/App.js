import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = (props) => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [number, setNumber] = useState('')
    const [searchKey, setSearchKey] = useState('')

    useEffect(() => {
        console.log('effect...')
        personService.getAll()
            .then(data => setPersons(data))
    }, [])

    const addName = (event) => {
        event.preventDefault()
        const person2add = {
            name: newName,
            number: number
        }
        // check if name already excist
        let repeatName = persons.find(p => p.name === newName)
        if (repeatName !== undefined) {
            console.log('find a name repeat')
            if (window.confirm(`${repeatName.name} is already added to phonebook, replace the old numberwith a new one?`)){
                console.log('update person number');
                personService.updatePerson(repeatName.id,person2add)
                    .then(data => {
                        const temp = persons.map(p => p.id === data.id
                            ? data : p)
                        setPersons(temp)
                    })
            }
            return
        }
        // check phone number exsist
        if (persons.find(p => p.number === number) !== undefined) {
            console.log('find a number repeat')
            alert(`${number} is already added to phonebook`)
            return
        }
        // add into persons
        // upload to back-end
        personService.addPerson(person2add)
            .then(data => {
                // console.log('response data:',data);
                setPersons(persons.concat(data));
            })
            .catch(e => { console.log('error:', e); })
    }

    const delPerson = person => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            personService.deletePerson(person.id)
                .then(data => {
                    setPersons(persons.filter(p => p.id !== person.id))
                })
                .catch(e => console.log('error:', e))
        }
    }

    return (
        <>
            <h2>Phonebook</h2>

            <Filter searchKey={searchKey} setSearchKey={setSearchKey} />

            <h3>add a new ppl</h3>

            <PersonForm addName={addName}
                number={number} setNumber={setNumber}
                newName={newName} setNewName={setNewName} />

            <h2>Numbers</h2>
            <Persons persons={persons} searchKey={searchKey}
                delPerson={delPerson} />
        </>
    )
}

export default App;
