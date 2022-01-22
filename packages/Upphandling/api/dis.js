import {get, post} from 'axios'
import { config } from '../lib/Config'
const { apiOrigin } = config

export const getDis = async () => {
  const { data } = await get(`${apiOrigin}/dis`)
  return data
}

export const getDisById = async (id) => {
  const { data } = await get(`${apiOrigin}/dis/${id}`)
  return data
}

export const createDis = (dis) => {
  return post(`${apiOrigin}/dis`, dis)
}
