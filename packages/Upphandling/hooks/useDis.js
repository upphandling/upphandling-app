import { useQuery } from 'react-query'
import { getDisById } from '../api/dis'

export const useDis = (id) => {
  return useQuery(['dis', id], () => getDisById(id))
}

