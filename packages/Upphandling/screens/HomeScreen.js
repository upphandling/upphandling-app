import React from 'react'
import {SafeAreaView} from 'react-native'
import {Button, Layout} from '@ui-kitten/components'
import {Dis} from '../components/Dis'

import list from '../data/dis.json'

export const HomeScreen = ({navigation}) => {
  const createDIS = () => {
    navigation.navigate('CreateDIS')
  }
  const openDIS = id => {
    navigation.navigate('OpenDIS', {id})
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {list.map(dis => (
          <Dis dis={dis} onPress={() => openDIS(dis.id)} />
        ))}
        <Button onPress={createDIS}>Skapa nytt DIS</Button>
      </Layout>
    </SafeAreaView>
  )
}
