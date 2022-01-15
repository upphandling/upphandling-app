import React from 'react'
import { AppRegistry } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import App from './App'
import { name as appName } from './app.json'

// TODO: Handle messages arriving when app is in backgrounded state (android mainly)
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
// When receiving messages in background this handler fires.
// It should store messages to localstorage only.
// No UI update allowed or setState, only write to localstorage
//   console.log('Message handled in the background!', remoteMessage)
// })
function HeadlessCheck(args) {
  if (args && args.isHeadless) {
    // App has been launched in the background by iOS, don't start full app.
    // Just let background handlers do their thing.
    return null
  }

  return <App />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
