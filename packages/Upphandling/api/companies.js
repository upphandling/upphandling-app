import axios from 'axios'
export const getCompanies = async () => {
  const { data } = await axios.get('https://api.upphandling.app/companies')
  return data
}

export const createCompany = async (company) => {
  console.log('calling api with company', company)
  const { data } = await axios.post('https://api.upphandling.app/companies', company)
  return data
}