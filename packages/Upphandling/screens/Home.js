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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            source={require('../assets/large-logo.png')}
            style={{ ...styles.image, ...styles[`image${size}`] }}
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
          status="basic"
          style={styles.button}
        >
          Hitta upphandlingar
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  hero: {
    padding: 18,
    textAlign: 'center',
  },
  heroLarge: {
    marginTop: 46,
    marginBottom: 46,
    fontSize: 38,
  },
  heroMedium: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 32,
  },
  heroSmall: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 26,
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
  imageLarge: {
    height: 360,
  },
  imageMedium: {
    height: 260,
  },
  imageSmall: {
    height: 180,
  },
})
