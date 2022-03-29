import React from 'react'
import { Button, Icon, ListItem, Text, withStyles } from '@ui-kitten/components'
import moment from 'moment'
import 'moment/locale/sv'
moment.locale('sv')

const Component = ({
  eva,
  title,
  description,
  onPressIcon,
  onPressRow,
  read,
  createdAt,
}) => {
  return (
    <ListItem
      title={title}
      description={`${moment().to(moment(createdAt))} - ${description}`}
      onPress={onPressRow}
      style={read ? eva.style.listItemRead : eva.style.listItemUnread}
      accessoryLeft={
        <Button
          onPress={onPressIcon}
          appearance="ghost"
          status={read ? 'basic' : 'primary'}
        >
          <Icon
            fill={
              read
                ? eva.theme['color-basic-default']
                : eva.theme['color-primary-default']
            }
            name="message-square"
            style={eva.style.itemIcon}
          />
        </Button>
      }
    />
  )
}

export const NotificationListItem = withStyles(Component, (theme) => ({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemIcon: {
    width: 32,
    height: 32,
  },
  listItemUnread: {
    backgroundColor: theme['background-basic-color-1'],
  },
  listItemRead: {
    backgroundColor: theme['background-basic-color-2'],
  },
}))
