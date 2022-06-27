import { useQuery } from 'react-query'
import { getCompanyFromId } from '../api/companies'
import checkOrgnr from 'se-orgnr-validator'

export const useCompany = (orgNr) => {
  return useQuery('company', () => {
    console.log('check orgnr', orgNr)
    if (!orgNr || !checkOrgnr (orgNr)) return { data: null, isLoading: false }
    return getCompanyFromId(orgNr)
  })
}