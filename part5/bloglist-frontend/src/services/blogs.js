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

export default { getAll, setToken, create }