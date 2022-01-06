import { useQuery } from 'react-query'
import { getDis } from '../api/dis'

export const useDises = () => {
  return useQuery('dis', getDis)
}

