import axios from 'axios'
export const getOffers = async () => {
  const { data } = await axios.get('https://api.upphandling.app/offers')
  return data
}

export const createOffer = (offer) => {
  return axios.post('https://api.upphandling.app/offers', offer)
}