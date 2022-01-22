import axios from 'axios'
import { config } from '../lib/Config'
const { apiOrigin } = config

export const getDis = async () => {
  const { data } = await axios.get(`${apiOrigin}/dis`)
  return data
}

export const getDisById = async (id) => {
  const { data } = await axios.get(`${apiOrigin}/dis/${id}`)
  return data
}

export const createDis = (dis) => {
  console.log('Creating dis...', dis)
  return axios.post(`${apiOrigin}/dis`, dis)
}
