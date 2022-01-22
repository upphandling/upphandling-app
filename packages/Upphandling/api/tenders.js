import {get, post} from 'axios'
import { config } from '../lib/Config'
const { apiOrigin } = config

export const getTenders = async () => {
  const { data } = await get(`${apiOrigin}/dis/${disId}/tenders`)
  return data
}

export const getTender = async (tenderId) => {
  const { data } = await get(`${apiOrigin}/tenders/${tenderId}`)
  return data
}


export const createTender = async (tender) => {
  console.log('creating tender', JSON.stringify(tender, null, 2))
  const { data } = await post(`${apiOrigin}/tenders`, tender).catch((error) => { 
    console.log('error', JSON.stringify(error))
    throw error
  })
  return data
}
