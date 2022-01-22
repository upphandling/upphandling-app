import React from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'

const getSize = (height) => {
  if (height > 800) {
    return 'Large'
  } else if (height > 600) {
    return 'Medium'
  } else {
    return 'Small'
  }
}

export const Home = ({ navigation }) => {
  const { height, width } = useWindowDimensions()
  const size = getSize(height)
  const createDIS = () => {
    navigation.navigate('CreateDIS')
  }
  const findDIS = () => {
    navigation.navigate('FindDIS')
  }

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView style={styles.flex}>
        <View style={styles.flex}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            source={require('../assets/thumb-up-dynamic-color.png')}
            style={{ ...styles.image, height: Math.floor(height / 2) }}
          />
        </View>
        <Text
          category="h1"
          style={{ ...styles.hero, ...styles[`hero${size}`] }}
        >
          Det lätta sättet att upphandla öppen källkod
        </Text>
        <Button onPress={createDIS} size="giant" style={styles.button}>
          Skapa nytt DIS
        </Button>
        <Button
          onPress={findDIS}
          size="small"
          appearance="ghost"
          status="info"
          style={styles.button}
        >
          Hitta upphandlingar
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  hero: {
    padding: 18,
  },
  heroLarge: {
    marginTop: -46,
    fontSize: 50,
  },
  heroMedium: {
    marginTop: -30,
    fontSize: 34,
  },
  heroSmall: {
    marginTop: -34,
    fontSize: 28,
  },
  container: {
    flex: 1,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 10,
  },
  image: {
    width: '100%',
    marginBottom: 10,
  },
})
