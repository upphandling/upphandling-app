import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {HomeScreen} from './HomeScreen'
import {CreateDISScreen} from './CreateDISScreen'
import {DISScreen} from './DISScreen'

const {Navigator, Screen} = createStackNavigator()

const HomeNavigator = () => (
  <Navigator>
    <Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'Upphandling.app'}}
    />
    <Screen
      name="CreateDIS"
      component={CreateDISScreen}
      options={{title: 'Skapa nytt DIS'}}
    />
    <Screen
      name="OpenDIS"
      component={DISScreen}
      options={{title: 'Detaljer'}}
    />
  </Navigator>
)

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
)
