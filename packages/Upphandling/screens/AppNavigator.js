import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SetupNotifications } from './SetupNotifications'
import { Notifications } from './Notifications'
import { Home } from './Home'
import { CreateDIS } from './CreateDIS'
import { DIS } from './DIS'
import { FindDIS } from './FindDIS'
import { ApplyDIS } from './ApplyDIS'
import { Loading } from './Loading'
import { NotificationIcon } from '../components/NotificationIcon'
import { useNotificationPermissionsStatus } from '../hooks/useNotificationPermissions'
import { createDevice } from '../api/device'
import { useMutation } from 'react-query'
import { Alert } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import { refreshToken } from '../lib/NotifService'

const { Navigator, Screen } = createStackNavigator()

const options = (specificOptions) => {
  return ({ navigation }) => {
    const defaultOptions = {
      headerRight: () => <NotificationIcon navigation={navigation} />,
    }
    return { ...defaultOptions, ...specificOptions }
  }
}
const HomeNavigator = () => {
  const createDeviceMutation = useMutation(createDevice)
  useEffect(() => {
    refreshToken().then((token) => {
      createDeviceMutation.mutateAsync({ pushToken: token })
    })
    const unsubscribe = messaging().onMessage((remoteMessage) => {
      // TODO: handle remote messages while running
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
      //queryClient.invalidateQueries('notifications')
    })
    return unsubscribe
  }, [])
  const permissionStatus = useNotificationPermissionsStatus()
  return (
    <Navigator>
      {permissionStatus === 'loading' && (
        <Screen name="Loading" component={Loading} options={{ title: '' }} />
      )}
      {permissionStatus === 'undefined' && (
        <Screen
          name="SetupNotifications"
          component={SetupNotifications}
          options={{ title: 'Aktivera pushnotiser' }}
        />
      )}
      {
        // TODO: Add a screen to explain how to fix disabled notifications
      }
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

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
)
