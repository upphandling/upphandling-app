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
  return axios.post(`${apiOrigin}/devices`, payload(pushToken))
}
