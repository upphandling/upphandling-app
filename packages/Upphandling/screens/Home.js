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
import { translate } from '../lib/translate'

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
            source={require('../assets/large-logo.png')}
            style={{ ...styles.image, ...styles[`image${size}`] }}
          />
        </View>
        <Text
          category="h1"
          style={{ ...styles.hero, ...styles[`hero${size}`] }}
        >
          {translate('Home.title')}
        </Text>
        <Button onPress={createDIS} size="giant" style={styles.button}>
          {translate('Home.create_dps_button')}
        </Button>
        <Button
          onPress={findDIS}
          size="small"
          appearance="ghost"
          status="basic"
          style={styles.button}
        >
          {translate('Home.find_dps_button')}
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
    textAlign: 'center',
  },
  heroLarge: {
    marginTop: 38,
    marginBottom: 38,
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
    height: 320,
  },
  imageMedium: {
    height: 260,
  },
  imageSmall: {
    height: 180,
  },
})
