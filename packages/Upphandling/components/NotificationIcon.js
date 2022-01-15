import React from 'react'
import { Button, Icon } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { useNotifications } from '../hooks/useNotifications'

export const NotificationIcon = ({ navigation }) => {
  const { status, data, error, isFetching } = useNotifications()
  let unreadCount = 0
  if (!isFetching && data) {
    const unread = data.filter((notif) => {
      return !notif.read
    })
    unreadCount = unread.length
  }
  const icon = !!unreadCount ? 'bell' : 'bell-outline'
  const color = !!unreadCount ? 'red' : 'blue'
  return (
    <Button
      onPress={() => navigation.navigate('Notifications')}
      appearance="ghost"
      title="Notifications"
      style={styles.icon}
    >
      <Icon style={styles.icon} fill={color} name={icon} />
    </Button>
  )
}

const styles = StyleSheet.create({
  button: { width: 64, height: 64, marginRight: 8 },
  icon: { width: 64, height: 64 },
})
