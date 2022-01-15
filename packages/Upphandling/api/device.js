import axios from 'axios'
import { config } from '../lib/Config'
import { Platform } from 'react-native'
import { getUniqueId, getVersion } from 'react-native-device-info'
const { apiOrigin } = config

const payload = (pushToken) => {
  return {
    deviceId: getUniqueId(),
    pushToken,
    platform: Platform.OS,
    appVersion: getVersion(),
  }
}

export const createDevice = async ({ pushToken }) => {
  console.log('createDevice', payload(pushToken))
  return axios.post(`${apiOrigin}/devices`, payload(pushToken))
}

export const updateDevice = async ({ pushToken }) => {
  console.log('updateDevice', payload(pushToken))
  const url = `${apiOrigin}/devices/${getUniqueId()}`
  try {
    return await axios.put(url), payload(pushToken)
  } catch (err) {
    console.error(`Error fetching url ${url}`, err)
    return []
  }
}
