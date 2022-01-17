import axios from 'axios'
export const getParticipations = async (disId) => {
  const { data } = await axios.get(`https://api.upphandling.app/participations?filter[where][disId]=${disId}`)
  return data
}

export const createParticipation = async ({disId, companyId}) => {
  const { data } = await axios.post(`http://localhost:3000/participations`, {disId, companyId})
  return data
}