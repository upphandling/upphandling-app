import AsyncStorage from '@react-native-async-storage/async-storage'

const keys = {
  NOTIFICATION_REGISTERED: 'NOTIFICATION_REGISTERED',
}

const errors = {
  E_KEY_FORMAT: 'Invalid or missing key',
  E_VALUE_MISSING: 'Missing value',
  E_JSON_SERIALIZE: 'Could not serialize value to JSON',
  E_STORAGE_W_ERROR: 'Storage error, could not write to storage',
  E_STORAGE_R_ERROR: 'Storage error, could not read from storage',
}

const getItem = async (key) => {
  return new Promise(async (resolve, reject) => {
    if (!key || !keys[key]) {
      reject(errors.E_KEY_FORMAT)
    }
    try {
      const value = await AsyncStorage.getItem(key)
      resolve(JSON.parse(value))
    } catch (err) {
      console.error(err)
      reject(errors.E_STORAGE_R_ERROR)
    }
  })
}

const setItem = async (key, value) => {
  return new Promise(async (resolve, reject) => {
    if (!key || !keys[key]) {
      reject(errors.E_KEY_FORMAT)
    }
    if (!value) {
      reject(errors.E_VALUE_MISSING)
    }
    let jsonValue
    try {
      jsonValue = JSON.stringify(value)
    } catch (err) {
      console.error(err)
      reject(errors.E_JSON_SERIALIZE)
    }
    try {
      const result = await AsyncStorage.setItem(key, jsonValue)
      resolve(result)
    } catch (err) {
      console.error(err)
      reject(errors.E_STORAGE_W_ERROR)
    }
  })
}

export default {
  getItem,
  setItem,
  errors,
  keys,
}
