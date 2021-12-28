import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {HomeScreen} from './HomeScreen'
import {DetailsScreen} from './DetailsScreen'

const {Navigator, Screen} = createStackNavigator()

const HomeNavigator = () => (
  <Navigator>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Details" component={DetailsScreen} />
  </Navigator>
)

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
)
