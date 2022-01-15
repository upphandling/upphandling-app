import axios from 'axios'
import { config } from '../lib/Config'
const { apiOrigin } = config

export const getCompanies = async () => {
  const { data } = await axios.get(`${apiOrigin}/companies`)
  return data
}

export const getCompanyFromId = async (id) => {
  const { data } = await axios.get(`${apiOrigin}/companies/${id}`)
  return data
}

export const createCompany = async (company) => {
  const { data } = await axios.post(`${apiOrigin}/companies`, company)
  return data
}
