import axios from 'axios';

const baseUrl = '/api/persons'

const getAll = () =>
    axios.get(baseUrl)
        .then(response => response.data)

const addPerson = newObj =>
    axios.post(baseUrl, newObj)
        .then(response => response.data)

const updatePerson = (id, newObj) =>
    axios.put(`${baseUrl}/${id}`, newObj)
        .then(response => response.data)

const deletePerson = id =>
    axios.delete(`${baseUrl}/${id}`)
        .then(response => response.data)

export default { getAll, addPerson, deletePerson, updatePerson }