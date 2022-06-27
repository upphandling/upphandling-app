'use strict'

import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import messaging from '@react-native-firebase/messaging'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

export const CacheInvalidator = ({ children }) => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage) => {
      queryClient.invalidateQueries('notifications')
      if (
        remoteMessage.notification &&
        remoteMessage.notification.body &&
        remoteMessage.notification.title
      ) {
        Toast.show({
          type: 'info',
          position: 'bottom',
          text1: remoteMessage.notification.title,
          text2: remoteMessage.notification.body,
          onPress: () => {
            navigation.navigate('Notifications')
          },
        })
      }
    })
    return unsubscribe
  })
  return <>{children}</>
}
