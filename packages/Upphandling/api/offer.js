import axios from 'axios'

export const createOffer = async ({offer}) => {
  const { data } = await axios.post(`https://api.upphandling.app/offers`, offer)
  return data
}