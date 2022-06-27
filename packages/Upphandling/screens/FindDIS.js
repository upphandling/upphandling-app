import React from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { DisCard } from '../components/DisCard'
import { useDises } from '../hooks/useDises'
import { Loading } from './Loading'

export const FindDIS = ({ navigation }) => {
  const { data, error, isFetching } = useDises()

  if (isFetching) return <Loading />
  if (error) return <Text>Error: {error.message}</Text>

  const openDIS = (id) => navigation.navigate('OpenDIS', { id })

  return (
    <SafeAreaView>
      <ScrollView>
        {data.map((dis, i) => (
          <DisCard key={i} dis={dis} onPress={() => openDIS(dis.id)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
