import { useQuery } from 'react-query'
import { getDisById } from '../api/dis'

export const useDis = (id) => {
  useQuery(['dis', id], () => getDisById(id))
}

