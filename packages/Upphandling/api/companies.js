import {get, post} from 'axios'
import { config } from '../lib/Config'
const { apiOrigin } = config

export const getCompanies = async () => {
  const { data } = await get(`${apiOrigin}/companies`)
  return data
}

export const getCompanyFromId = async (id) => {
  const { data } = await get(`${apiOrigin}/companies/${id}`)
  return data
}

export const createCompany = async (company) => {
  const { data } = await post(`${apiOrigin}/companies`, company)
  return data
}
