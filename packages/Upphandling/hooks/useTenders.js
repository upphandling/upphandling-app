import { useQuery } from 'react-query'
import { getTenders } from '../api/tenders'

export const useTenders = () => (
  useQuery('tenders', getTenders)
)