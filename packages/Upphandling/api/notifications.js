import axios from 'axios'
import { config } from '../lib/Config'
const { apiOrigin } = config
import { getUniqueId } from 'react-native-device-info'

export const getNotificationsForDevice = async () => {
  const deviceId = getUniqueId()
  const url = `${apiOrigin}/devices/${deviceId}/notifications`
  try {
    return (await axios.get(url))?.data
  } catch (err) {
    console.error(`Error fetching url ${url}`, err)
    return []
  }
}

export const setNotificationRead = async ({ read, id }) => {
  const deviceId = getUniqueId()
  const url = `${apiOrigin}/devices/${deviceId}/notifications/${id}`
  try {
    return await axios.put(url, { read: read })
  } catch (err) {
    console.error(`Error fetching url ${url}`, err)
    return []
  }
}
