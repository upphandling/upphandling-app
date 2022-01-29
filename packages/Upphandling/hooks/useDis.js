import { useQuery } from 'react-query'
import { getDisById } from '../api/dis'

export const useDis = (id) => {
  if (!id) return { data: null, isLoading: false }
  return id && useQuery(['dis', id], () => getDisById(id))
}

