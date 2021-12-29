import React from 'react'
import {SafeAreaView, ScrollView} from 'react-native'
import list from '../data/dis.json'
import {DisCard} from '../components/DisCard'

export const FindDIS = ({navigation}) => {
  const openDIS = id => navigation.navigate('OpenDIS', {id})

  return (
    <SafeAreaView>
      <ScrollView>
        {list.map(dis => (
          <DisCard dis={dis} onPress={() => openDIS(dis.id)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
