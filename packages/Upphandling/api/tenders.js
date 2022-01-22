import axios from 'axios'
import { config } from '../lib/Config'
const { apiOrigin } = config

export const getTenders = async () => {
  const { data } = await axios.get(`${apiOrigin}/tenders`)
  return data
}

export const createTender = async (tender) => {
  console.log('creating tender', JSON.stringify(tender, null, 2))
  const { data } = await axios.post(`${apiOrigin}/tenders`, tender).catch((error) => { 
    console.log('error', JSON.stringify(error))
    throw error
  })
  return data
}
