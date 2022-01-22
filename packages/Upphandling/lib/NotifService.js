import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'
const isIos = Platform.OS === 'ios'

export const hasPermission = async () => {
  try {
    const authStatus = await messaging().hasPermission()
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    )
  } catch (err) {
    console.error(err)
    return false
  }
}

export const refreshToken = async () => {
  return new Promise(async (resolve, reject) => {
    if (await hasPermission()) {
      messaging()
        .getToken()
        .then(resolve)
        .catch((err) => {
          console.error('refreshToken failed', err)
          reject()
        })
    } else {
      reject()
    }
  })
}

export const requestPermissions = async (addDeviceMutation) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isIos) {
        await messaging().requestPermission()
        if (hasPermission()) {
          const token = await messaging().getToken()
          resolve(token)
        } else {
          reject(new Error('Permission not granted'))
        }
      } else {
        const token = await messaging().getToken()
        resolve(token)
      }
    } catch (error) {
      reject(error)
    }
  })
}
