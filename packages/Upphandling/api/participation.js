import axios from 'axios'
export const getParticipations = async (disId) => {
  const { data } = await axios.get(`https://api.upphandling.app/participations?filter[where][disId]=${disId}`)
  return data
}

export const createParticipation = (participation) => {
  return axios.post('https://api.upphandling.app/participations', participation)
}