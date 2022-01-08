import axios from 'axios'
export const getCompanies = async () => {
  const { data } = await axios.get('https://api.upphandling.app/companies')
  return data
}

export const createCompany = (company) => {
  return axios.post('https://api.upphandling.app/companies', company)
}