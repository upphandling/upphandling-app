import axios from 'axios'
export const getTenders = async () => {
  const { data } = await axios.get('https://api.upphandling.app/tenders')
  return data
}

export const createTender = (tender) => {
  return axios.post('https://api.upphandling.app/tenders', tender)
}