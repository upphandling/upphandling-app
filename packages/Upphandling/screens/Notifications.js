import React from 'react'
import { ScrollView } from 'react-native'
import {
  Button,
  Card,
  Icon,
  List,
  StyleService,
  Text,
  useStyleSheet,
  withStyles,
} from '@ui-kitten/components'
import { useNotifications } from '../hooks/useNotifications'

const NotificationsComp = ({ eva }) => {
  const { status, data, error, isFetching } = useNotifications()
  if (isFetching) return <Text>Letar efter nya notiser</Text>
  if (error) return <Text>Error: {error.message}</Text>
  if (!data || data.length === 0) return <Text>Inga notiser att visa</Text>

  const performAction = (action, dis, actionId) => {
    console.warn('performAction for notifications not implemented')
  }

  const renderItem = ({
    item: { id, title, action, actionId, read },
    index,
  }) => {
    return (
      <Button
        style={eva.style.itemContainer}
        onPress={() => performAction(action, dis, actionId)}
        appearance="ghost"
        title={title}
        status={read ? 'basic' : 'primary'}
        accessoryLeft={() => (
          <Icon
            fill={
              read
                ? eva.theme['color-basic-default']
                : eva.theme['color-primary-default']
            }
            name="message-square"
            style={eva.style.itemIcon}
          />
        )}
      >
        <Text>{title}</Text>
      </Button>
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
}))
