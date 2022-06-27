import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import Storage from '../lib/Storage'
import { hasPermission } from '../lib/NotifService'

export const useNotificationPermissionsStatus = () => {
  const states = {
    loading: 'loading',
    granted: 'granted',
    revoked: 'revoked',
    undefined: 'undefined',
    error: 'error',
  }
  const [status, setStatus] = useState(states.loading)
  const isIos = Platform.OS === 'ios'

  useEffect(() => {
    async function handleStatusChange(status) {
      if (isIos) {
        if (status === true) {
          if (await hasPermission()) {
            setStatus(states.granted)
          } else {
            setStatus(states.revoked)
          }
        } else {
          setStatus(states.undefined)
        }
      } else {
        setStatus(states.granted)
      }
    }
    Storage.getItem(Storage.keys.NOTIFICATION_REGISTERED)
      .then(handleStatusChange)
      .catch((error) => {
        setStatus(states.error)
        console.error(error)
      })
  })
  const defaultRoutes = {
    loading: 'Loading',
    undefined: 'SetupNotifications',
    revoked: 'FixNotifications',
    granted: 'Home',
  }
  return defaultRoutes[status] || 'Error'
}
