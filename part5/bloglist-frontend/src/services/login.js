import axios from 'axios'
const baseUrl = '/api/login'

const login = async credential => {
  const resp = await axios.post(baseUrl, credential)
  return resp.data
}

export default { login }