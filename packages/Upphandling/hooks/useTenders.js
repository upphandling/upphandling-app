import { useQuery } from 'react-query'
import { getTenders, getTender } from '../api/tenders'

export const useTenders = (disId) => (
  useQuery(['tenders', disId], () => getTenders(disId))
)

export const useTender = (tenderId) => (
  useQuery(['tender', tenderId], () => getTender(tenderId))
)