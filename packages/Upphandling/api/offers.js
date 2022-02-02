import {get, post} from 'axios'
export const getOffers = async () => {
  const { data } = await get('https://api.upphandling.app/offers')
  return data
}

export const createOffer = (offer) => {
  return post('https://api.upphandling.app/offers', offer)
}