import axios from 'axios'
import { config } from '../lib/Config'
const { apiOrigin } = config

export const getNotificationsForDevice = async (deviceId) => {
  const url = `${apiOrigin}/devices/${deviceId}/notifications`
  console.log('getNotificationsForDevice', deviceId, url)
  try {
    return (await axios.get(url))?.data
  } catch (err) {
    console.error(`Error fetching url ${url}`, err)
    return []
  }
}
