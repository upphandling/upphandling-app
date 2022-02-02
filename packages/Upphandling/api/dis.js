import {get, post} from 'axios'
export const getDis = async () => {
  const { data } = await get('https://api.upphandling.app/dis')
  return data
}

export const getDisById = async (id) => {
  const { data } = await get(`https://api.upphandling.app/dis/${id}`)
  return data
}

export const createDis = (dis) => {
  console.log('Creating dis...', dis)
  return post('https://api.upphandling.app/dis', dis)
}