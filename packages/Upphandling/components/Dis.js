import React from 'react'
import {Card, Text} from '@ui-kitten/components'

export const Dis = ({dis, onPress}) => {
  return (
    <Card onPress={onPress}>
      <Text category="h1">{dis.name}</Text>
    </Card>
  )
}
