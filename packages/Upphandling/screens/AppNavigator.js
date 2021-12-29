import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Home} from './Home'
import {CreateDIS} from './CreateDIS'
import {DIS} from './DIS'
import {FindDIS} from './FindDIS'

const {Navigator, Screen} = createStackNavigator()

const HomeNavigator = () => (
  <Navigator>
    <Screen name="Home" component={Home} options={{title: 'Upphandling.app'}} />
    <Screen
      name="CreateDIS"
      component={CreateDIS}
      options={{title: 'Skapa nytt DIS'}}
    />
    <Screen name="OpenDIS" component={DIS} options={{title: 'Detaljer'}} />

    <Screen
      name="FindDIS"
      component={FindDIS}
      options={{title: 'Hitta upphandling'}}
    />
  </Navigator>
)

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
)
