import axios from 'axios'
export const getParticipations = async (disId) => {
  const { data } = await axios.get(`https://api.upphandling.app/dis/${disId}/companies`)
  return data
}

export const createParticipation = async ({disId, companyId}) => {
  const { data } = await axios.post(`https://api.upphandling.app/participations`, {disId, companyId})
  return data
}