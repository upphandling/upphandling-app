import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {HomeScreen} from './HomeScreen'
import {CreateDISScreen} from './CreateDISScreen'
import {DISScreen} from './DISScreen'

const {Navigator, Screen} = createStackNavigator()

const HomeNavigator = () => (
  <Navigator>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="CreateDIS" component={CreateDISScreen} />
    <Screen name="OpenDIS" component={DISScreen} />
  </Navigator>
)

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
)
