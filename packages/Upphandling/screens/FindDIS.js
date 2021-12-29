import React from 'react'
import {SafeAreaView, ScrollView} from 'react-native'
import {Layout} from '@ui-kitten/components'
import list from '../data/dis.json'
import {DisCard} from '../components/DisCard'

export const FindDIS = ({route}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        {list.map(dis => (
          <DisCard dis={dis} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
