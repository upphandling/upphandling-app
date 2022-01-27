import React from 'react'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from './Home'
import { CreateDIS } from './CreateDIS'
import { DIS } from './DIS'
import { FindDIS } from './FindDIS'
import { ApplyDIS } from './ApplyDIS'
import { CreateTender } from './CreateTender'
import { OpenTender } from './OpenTender'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => (
  <Navigator>
    <Screen
      name="Home"
      component={Home}
      options={{ title: 'Upphandling.app' }}
    />
    <Screen
      name="CreateDIS"
      component={CreateDIS}
      options={{ title: 'Skapa nytt DIS' }}
    />
    <Screen name="OpenDIS" component={DIS} options={{ title: 'Detaljer' }} />
    <Screen name="ApplyDIS" component={ApplyDIS} options={{ title: 'Ansök' }} />
    <Screen
      name="CreateTender"
      component={CreateTender}
      options={{ title: 'Skapa specifik upphandling' }}
    />
    <Screen
      name="OpenTender"
      component={OpenTender}
      options={{ title: 'Specifik upphandling' }}
    />

    <Screen
      name="FindDIS"
      component={FindDIS}
      options={{ title: 'Hitta upphandling' }}
    />
  </Navigator>
)

export const AppNavigator = () => (
  <NavigationContainer theme={DarkTheme}>
    <HomeNavigator />
  </NavigationContainer>
)
