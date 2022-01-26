import axios from 'axios'

export const getTenders = async () => {
  const { data } = await axios.get('https://api.upphandling.app/tenders')
  return data
}

export const createTender = async (tender) => {
  console.log('creating tender', JSON.stringify(tender, null, 2))
  const { data } = await axios.post('https://api.upphandling.app/tenders', tender).catch((error) => { 
    console.log('error', JSON.stringify(error))
    throw error
  })
  return data
}