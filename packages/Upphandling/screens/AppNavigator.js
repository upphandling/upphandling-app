import React, { useEffect } from 'react'
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useNavigation,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SetupNotifications } from './SetupNotifications'
import { FixNotifications } from './FixNotifications'
import { Notifications } from './Notifications'
import { Home } from './Home'
import { CreateDIS } from './CreateDIS'
import { DIS } from './DIS'
import { FindDIS } from './FindDIS'
import { ApplyDIS } from './ApplyDIS'
import { CreateTender } from './CreateTender'
import { Loading } from './Loading'
import { NotificationIcon } from '../components/NotificationIcon'
import { useNotificationPermissionsStatus } from '../hooks/useNotificationPermissions'
import messaging from '@react-native-firebase/messaging'
import Toast from 'react-native-toast-message'
import { CacheInvalidator } from '../components/util/CacheInvalidator'
const { Navigator, Screen } = createStackNavigator()

const options = (specificOptions) => {
  return ({ navigation }) => {
    const defaultOptions = {
      headerRight: () => <NotificationIcon navigation={navigation} />,
    }
    return { ...defaultOptions, ...specificOptions }
  }
}
const HomeNavigator = ({ initialRoute }) => {
  return (
    <Navigator>
      {initialRoute === 'SetupNotifications' && (
        <Screen
          name="SetupNotifications"
          component={SetupNotifications}
          options={{ title: 'Aktivera pushnotiser' }}
        />
      )}
      {initialRoute === 'FixNotifications' && (
        <Screen
          name="FixNotifications"
          component={FixNotifications}
          options={{ title: 'Laga pushnotiser' }}
        />
      )}
      {initialRoute === 'Loading' && (
        <Screen name="Loading" component={Loading} options={{ title: '' }} />
      )}
      <Screen
        name="Home"
        component={Home}
        options={options({ title: 'Upphandling.app' })}
      />
      <Screen
        name="CreateDIS"
        component={CreateDIS}
        options={options({ title: 'Skapa nytt DIS' })}
      />
      <Screen
        name="OpenDIS"
        component={DIS}
        options={options({ title: 'Detaljer' })}
      />
      <Screen
        name="ApplyDIS"
        component={ApplyDIS}
        options={options({ title: 'Ansök' })}
      />
      <Screen
        name="CreateTender"
        component={CreateTender}
        options={options({ title: 'Skapa specifik upphandling' })}
      />
      <Screen
        name="OpenTender"
        component={OpenTender}
        options={options({ title: 'Specifik upphandling' })}
      />
      <Screen
        name="CreateOffer"
        component={CreateOffer}
        options={options({ title: 'Lämna anbud' })}
      />
      <Screen
        name="FindDIS"
        component={FindDIS}
        options={options({ title: 'Hitta upphandling' })}
      />
      <Screen
        name="Notifications"
        component={Notifications}
        options={{ title: 'Dina notiser' }}
      />
    </Navigator>
  )
}

const getNavigatorTheme = (colorScheme) => {
  if (colorScheme === 'dark') {
    return { ...DarkTheme, primary: '#fff' }
  } else {
    return { ...DefaultTheme, primary: '#111' }
  }
}

const NotificationNavigator = ({ children, setInitialRoute }) => {
  const navigation = useNavigation()
  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage.data.actionId) {
        navigation.navigate(remoteMessage.data.action, {
          id: remoteMessage.data.actionId,
        })
      }
    })

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          navigation.push(remoteMessage.data.action, {
            id: remoteMessage.data.actionId,
          })
        }
      })
  }, [])
  return <>{children}</>
}
export const AppNavigator = ({ colorScheme }) => {
  const theme = getNavigatorTheme(colorScheme)
  const permissionStatus = useNotificationPermissionsStatus()
  return (
    <>
      <NavigationContainer theme={theme}>
        <CacheInvalidator>
          <NotificationNavigator>
            <HomeNavigator initialRoute={permissionStatus} />
          </NotificationNavigator>
        </CacheInvalidator>
      </NavigationContainer>
      <Toast />
    </>
  )
}
