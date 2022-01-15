import axios from 'axios'
import { config } from '../lib/Config'
const { apiOrigin } = config

export const getTenders = async () => {
  const { data } = await axios.get(`${apiOrigin}/tenders`)
  return data
}

export const createTender = (tender) => {
  return axios.post(`${apiOrigin}/tenders`, tender)
}
