import React from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import {Avatar, Button, Layout, Text} from '@ui-kitten/components'

export const Home = ({navigation}) => {
  const createDIS = () => {
    navigation.navigate('CreateDIS')
  }
  const findDIS = id => {
    navigation.navigate('FindDIS', {id})
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Avatar
        source={require('../assets/thumb-up-dynamic-color.png')}
        style={styles.image}
      />
      <Text category="h1" style={styles.hero}>
        Det lätta sättet att upphandla öppen källkod
      </Text>
      <Button onPress={createDIS} size="giant">
        Skapa nytt DIS
      </Button>
      <Button onPress={findDIS} size="small" appearance="ghost" status="info">
        Hitta upphandlingar
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  hero: {
    fontSize: 50,
    padding: 18,
    marginTop: -46,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    padding: 10,
    minHeight: 350,
  },
})
