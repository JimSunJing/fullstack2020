import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = (rawToken) => {
  token = `bearer ${rawToken}`
}

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token }
  }
  const resp = await axios.post(baseUrl, newObj, config)
  return resp.data
}

const update = async newObj => {
  const resp = await axios.put(`${baseUrl}/${newObj.id}`, newObj)
  return resp.data
}

const deleteBlog = async data => {
  const config = {
    headers: { Authorization: token }
  }
  const resp = await axios.delete(`${baseUrl}/${data.id}`,config)
  return resp.data
}

export default { 
  getAll, 
  setToken, 
  create, 
  update,
  deleteBlog
}