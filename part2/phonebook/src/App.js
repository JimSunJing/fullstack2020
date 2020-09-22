import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      if (window.confirm(`${repeatName.name} is already added to phonebook, replace the old numberwith a new one?`)) {
        console.log('update person number');
        personService
          .updatePerson(repeatName.id, person2add)
          .then(data => {
            setPersons(persons.map(p => p.id === data.id
              ? data : p))
            // notify user
            showMessage(`Update ${repeatName.name}'s phone number success.`)
          })
          .catch(e => {
            const msg = e.response.data.error
            console.log('error:', e.response.data)
            if (msg.indexOf('Validation') === -1) {
              showErrorMessage(`Information of ${repeatName.name} has already been removed from server`)
              setPersons(persons.filter(p => p.name !== repeatName.name))
            }else {showErrorMessage(msg)}
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
        showMessage(`Added ${person2add.name}`)
      })
      .catch(e => {
        console.log('error:', e.response.data)
        showErrorMessage(e.response.data.error)
      })
  }

  const delPerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id)
        .then(data => {
          setPersons(persons.filter(p => p.id !== person.id))
          showMessage(`${person.name} has been deleted`)
        })
        .catch(e => console.log('error:', e))
    }
  }

  const showMessage = m => {
    setMessage(m)
    setTimeout(() => { setMessage(null) }, 5000)
  }

  const showErrorMessage = m => {
    setErrorMessage(m)
    setTimeout(() => { setErrorMessage(null) }, 5000)
  }

  return (
    <>
      <h2>Phonebook</h2>

      <Notification message={message} color='green' />
      <Notification message={errorMessage} color='red' />

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
