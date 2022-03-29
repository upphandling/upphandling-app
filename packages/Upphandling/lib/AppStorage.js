import AsyncStorage from '@react-native-async-storage/async-storage'

export default class AppStorage {
  static settingsStorageKeyPrefix = 'appsetting_'

  /**
   * Stores a setting
   * @param key
   * @param value
   */
  static async setSetting(key, value) {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(this.settingsStorageKeyPrefix + key, jsonValue)
  }

  /**
   * Gets a stored setting
   * @param key
   * @returns
   */
  static async getSetting(key) {
    const value = await AsyncStorage.getItem(
      this.settingsStorageKeyPrefix + key
    )
    return value ? JSON.parse(value) : null
  }

  /**
   *  Clears all settings
   */
  static async clearAllSettings() {
    const allKeys = await AsyncStorage.getAllKeys()
    const settingsKeys = allKeys.filter((x) =>
      x.startsWith(this.settingsStorageKeyPrefix)
    )
    await AsyncStorage.multiRemove(settingsKeys)
  }

  /**
   * Clears all async storage for this app and all libs that it uses
   */
  static async nukeAllStorage() {
    await AsyncStorage.clear()
  }
}
