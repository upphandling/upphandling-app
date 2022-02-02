import {get} from 'axios'
export const getCompanies = async () => {
  const { data } = await get('https://api.upphandling.app/companies')
  return data
}

export const getCompanyFromId = async (id) => {
  const { data } = await get(`https://api.upphandling.app/companies/${id}`)
  return data
}

export const createCompany = async (company) => {
  const { data } = await post('https://api.upphandling.app/companies', company)
  return data
}