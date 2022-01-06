import React from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { DisCard } from '../components/DisCard'
import { useDises } from '../hooks/useDises'

export const FindDIS = ({ navigation }) => {
  const { data, error, isFetching } = useDises()

  if (isFetching) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const openDIS = (id) => navigation.navigate('OpenDIS', { id })

  return (
    <SafeAreaView>
      <ScrollView>
        {data.map((dis) => (
          <DisCard dis={dis} onPress={() => openDIS(dis.id)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
