import React from 'react'
import { Button, Icon, useTheme, withStyles } from '@ui-kitten/components'
import { useNotifications } from '../hooks/useNotifications'

const NotificationIconComp = ({ eva, navigation }) => {
  const { status, data, error, isFetching } = useNotifications()
  const theme = useTheme()
  let unreadCount = 0
  if (!isFetching && data) {
    const unread = data.filter((notif) => {
      return !notif.read
    })
    unreadCount = unread.length
  }
  const icon = !!unreadCount ? 'bell' : 'bell-outline'
  const color = !!unreadCount
    ? theme['color-danger-800']
    : theme['color-primary-500']
  return (
    <Button
      onPress={() => navigation.navigate('Notifications')}
      appearance="ghost"
      title="Notifications"
      style={eva.style.icon}
    >
      <Icon style={eva.style.icon} fill={color} name={icon} />
    </Button>
  )
}

export const NotificationIcon = withStyles(NotificationIconComp, (theme) => ({
  button: {
    width: 64,
    height: 64,
    marginRight: 8,
  },
  icon: {
    width: 64,
    height: 64,
  },
}))
