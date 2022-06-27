import React, { useEffect } from 'react'
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useNavigation,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApplyDIS } from './ApplyDIS'
import { CreateDIS } from './CreateDIS'
import { CreateOffer } from './CreateOffer'
import { CreateTender } from './CreateTender'
import { FindDIS } from './FindDIS'
import { FixNotifications } from './FixNotifications'
import { Home } from './Home'
import { Loading } from './Loading'
import { Notifications } from './Notifications'
import { OpenDIS } from './OpenDIS'
import { OpenTender } from './OpenTender'
import { SetupNotifications } from './SetupNotifications'
import { NotificationIcon } from '../components/NotificationIcon'
import { useNotificationPermissionsStatus } from '../hooks/useNotificationPermissions'
import messaging from '@react-native-firebase/messaging'
import Toast from 'react-native-toast-message'
import { CacheInvalidator } from '../components/util/CacheInvalidator'
import { translate } from '../lib/translate'
const { Navigator, Screen } = createStackNavigator()

const options = (specificOptions) => {
  return ({ navigation }) => {
    const defaultOptions = {
      headerBackTitleVisible: false,
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
          options={{ title: translate('AppNavigator.SetupNotificationsTitle') }}
        />
      )}
      {initialRoute === 'FixNotifications' && (
        <Screen
          name="FixNotifications"
          component={FixNotifications}
          options={{ title: translate('AppNavigator.FixNotificationsTitle') }}
        />
      )}
      {initialRoute === 'Loading' && (
        <Screen
          name="Loading"
          component={Loading}
          options={{ title: translate('AppNavigator.LoadingTitle') }}
        />
      )}
      <Screen
        name="Home"
        component={Home}
        options={options({ title: translate('AppNavigator.HomeTitle') })}
      />
      <Screen
        name="CreateDIS"
        component={CreateDIS}
        options={options({ title: translate('AppNavigator.CreateDISTitle') })}
      />
      <Screen
        name="OpenDIS"
        component={OpenDIS}
        options={options({ title: translate('AppNavigator.DISTitle') })}
      />
      <Screen
        name="ApplyDIS"
        component={ApplyDIS}
        options={options({ title: translate('AppNavigator.ApplyDISTitle') })}
      />
      <Screen
        name="CreateTender"
        component={CreateTender}
        options={options({
          title: translate('AppNavigator.CreateTenderTitle'),
        })}
      />
      <Screen
        name="OpenTender"
        component={OpenTender}
        options={options({ title: translate('AppNavigator.OpenTenderTitle') })}
      />
      <Screen
        name="CreateOffer"
        component={CreateOffer}
        options={options({ title: translate('AppNavigator.CreateOfferTitle') })}
      />
      <Screen
        name="FindDIS"
        component={FindDIS}
        options={options({ title: translate('AppNavigator.FindDISTitle') })}
      />
      <Screen
        name="Notifications"
        component={Notifications}
        options={options({
          title: translate('AppNavigator.NotificationsTitle'),
          headerRight: undefined,
        })}
      />
    </Navigator>
  )
}

const getNavigatorTheme = (colorScheme) => {
  if (colorScheme === 'dark') {
    return { ...DarkTheme }
  } else {
    return {
      ...DefaultTheme,
      colors: {
        primary: '#111',
        text: '#12211B',
        background: '#F5FAF8',
        border: '#91C5B0',
      },
    }
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
