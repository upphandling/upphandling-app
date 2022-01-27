import { useQuery } from 'react-query'
import { getDisById } from '../api/dis'

export const useDis = (id) => {
  return id && useQuery(['dis', id], () => getDisById(id))
}

