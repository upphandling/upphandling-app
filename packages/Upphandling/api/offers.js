import {get, post} from 'axios'
import { config } from '../lib/Config'
const { apiOrigin } = config

export const getOffers = async () => {
  const { data } = await get(`${apiOrigin}/offers`)
  return data
}

export const createOffer = (offer) => {
  return post(`${apiOrigin}/offers`, offer)
}
