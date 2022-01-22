// import React from 'react'
// import {
//   TextInput,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Alert,
//   SafeAreaView,
// } from 'react-native'

// import { NotifContextConsumer } from '../lib/notifications/NotifContext'
// import { ClientStateConsumer } from '../lib/state/StateContext'

// export const DebugNotifications = ({ navigation }) => {
//   //private method alerting the attributes JSON Stringified
//   const buttonCallback = (attributes) => {
//     Alert.alert('Notification', JSON.stringify(attributes))
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ClientStateConsumer>
//         {({ deviceId }) => (
//           <NotifContextConsumer>
//             {({ service, notifications, fcmRegistered, token }) => (
//               <View style={styles.container}>
//                 <Text style={styles.title}>
//                   Example app react-native-push-notification
//                 </Text>
//                 <Text style={styles.subTitle}>DeviceId: {deviceId}</Text>
//                 <View style={styles.spacer}></View>
//                 <TextInput
//                   style={styles.textField}
//                   value={token}
//                   placeholder="Register token"
//                 />
//                 <View style={styles.spacer}></View>

//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.localNotif()
//                   }}
//                 >
//                   <Text>Local Notification (now)</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.localNotif('sample.mp3')
//                   }}
//                 >
//                   <Text>Local Notification with sound (now)</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.scheduleNotif()
//                   }}
//                 >
//                   <Text>Schedule Notification in 30s</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.scheduleNotif('sample.mp3')
//                   }}
//                 >
//                   <Text>Schedule Notification with sound in 30s</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.cancelNotif()
//                   }}
//                 >
//                   <Text>Cancel last notification (if any)</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.cancelAll()
//                   }}
//                 >
//                   <Text>Cancel all notifications</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.checkPermission(buttonCallback.bind(service))
//                   }}
//                 >
//                   <Text>Check Permission</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.requestPermissions()
//                   }}
//                 >
//                   <Text>Request Permissions</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.abandonPermissions()
//                   }}
//                 >
//                   <Text>Abandon Permissions</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.getScheduledLocalNotifications((notifs) =>
//                       console.log(notifs)
//                     )
//                   }}
//                 >
//                   <Text>Console.Log Scheduled Local Notifications</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.getDeliveredNotifications((notifs) =>
//                       console.log(notifs)
//                     )
//                   }}
//                 >
//                   <Text>Console.Log Delivered Notifications</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.createOrUpdateChannel()
//                   }}
//                 >
//                   <Text>Create or update a channel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     service.popInitialNotification()
//                   }}
//                 >
//                   <Text>popInitialNotification</Text>
//                 </TouchableOpacity>

//                 <View style={styles.spacer}></View>

//                 {fcmRegistered && <Text>FCM Configured !</Text>}

//                 <View style={styles.spacer}></View>
//               </View>
//             )}
//           </NotifContextConsumer>
//         )}
//       </ClientStateConsumer>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   button: {
//     borderWidth: 1,
//     borderColor: '#000000',
//     margin: 5,
//     padding: 5,
//     width: '70%',
//     backgroundColor: '#DDDDDD',
//     borderRadius: 5,
//   },
//   textField: {
//     borderWidth: 1,
//     borderColor: '#AAAAAA',
//     margin: 5,
//     padding: 5,
//     width: '70%',
//   },
//   spacer: {
//     height: 10,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     textAlign: 'center',
//   },
//   subTitle: {
//     textAlign: 'center',
//     fontSize: 12,
//   },
// })
