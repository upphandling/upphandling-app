import axios from 'axios'
import { config } from '../lib/Config'
const { apiOrigin } = config

export const getOffers = async () => {
  const { data } = await axios.get(`${apiOrigin}/offers`)
  return data
}

export const createOffer = (offer) => {
  return axios.post(`${apiOrigin}/offers`, offer)
}
