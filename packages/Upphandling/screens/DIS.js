import React from 'react'
import {SafeAreaView} from 'react-native'
import {Layout, Text} from '@ui-kitten/components'
import list from '../data/dis.json'

export const DIS = ({route}) => {
  const id = route.params.id
  const dis = list.find(item => item.id === id)
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category="h1">{dis.title}</Text>
      </Layout>
    </SafeAreaView>
  )
}
