import React from 'react'
import { List, Text, withStyles } from '@ui-kitten/components'
import { setNotificationRead } from '../api/notifications'
import { useMutation, useQueryClient } from 'react-query'
import { useNotifications } from '../hooks/useNotifications'
import { NotificationListItem } from '../components/NotificationListItem'

const NotificationsComp = ({ eva, navigation }) => {
  const { status, data, error, isFetching } = useNotifications()
  const queryClient = useQueryClient()
  const markReadMutation = useMutation(setNotificationRead, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['notifications', { id: variables.id }], data)
      queryClient.invalidateQueries(['notifications'])
    },
  })
  // if (isFetching)
  //   return <Text style={eva.style.msg}>Letar efter nya notiser</Text>
  if (error) return <Text style={eva.style.msg}>Error: {error.message}</Text>
  if (!data || data.length === 0)
    return <Text style={eva.style.msg}>Inga notiser att visa</Text>

  const performAction = (action, actionId) => {
    navigation.navigate(action, { id: actionId })
  }

  const renderItem = ({
    item: { id, title, action, actionId, read, createdAt, description },
  }) => {
    return (
      <NotificationListItem
        onPressIcon={() => markReadMutation.mutateAsync({ read: !read, id })}
        onPressRow={() => {
          performAction(action, actionId)
          if (!read) {
            markReadMutation.mutateAsync({ read: true, id })
          }
        }}
        title={title}
        description={description}
        read={read}
        createdAt={createdAt}
      />
    )
  }

  return <List data={data} renderItem={renderItem} />
}
export const Notifications = withStyles(NotificationsComp, (theme) => ({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemIcon: {
    width: 32,
    height: 32,
  },
  msg: {
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 30,
  },
}))
