import { useQuery } from 'react-query'
import { getOffers } from '../api/offers'

export const useOffers = () => (
  useQuery('offers', () => getOffers())
)