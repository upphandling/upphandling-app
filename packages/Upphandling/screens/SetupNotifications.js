import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import {
  Button,
  Card,
  Icon,
  Layout,
  SelectItem,
  Text,
  useTheme,
  withStyles,
} from '@ui-kitten/components'
import { requestPermissions } from '../lib/NotifService'
import { createDevice } from '../api/device'
import { useMutation } from 'react-query'
import Storage from '../lib/Storage'

const SetupNotificationsComponent = ({ navigation, eva }) => {
  const [notificationStatus, setNotificationStatus] = useState('primary')
  const theme = useTheme()
  const addDeviceMutation = useMutation(createDevice)
  const skipRegistering = () => {
    navigation.navigate('Home')
  }

  const registerDevice = async () => {
    requestPermissions(addDeviceMutation)
      .then(async (token) => {
        console.log('got token', token)
        Storage.setItem(Storage.keys.NOTIFICATION_REGISTERED, true)
        await addDeviceMutation.mutateAsync({ pushToken: token })
        navigation.replace('Home')
      })
      .catch((err) => {
        console.error(err)
        setNotificationStatus('danger')
      })
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: theme['background-basic-color-1'],
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <Layout style={eva.style.container} level="3">
          <Card
            style={{ flex: 1, marginHorizontal: 4 }}
            status={notificationStatus}
          >
            <View style={eva.style.headerImage}>
              <Icon
                style={eva.style.icon}
                fill={theme[`color-${notificationStatus}-default`]}
                name="bell-outline"
              />
            </View>
            <View style={eva.style.headerTextContainer}>
              <Text style={{ textAlign: 'center', marginBottom: 16 }}>
                För att få uppdateringar vid nya publicerade upphandlingar och
                processer du är delaktig i.
              </Text>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Vänligen aktivera pushnotiser.
              </Text>
            </View>
            <View style={eva.style.footerContainer}>
              <Button
                onPress={skipRegistering}
                style={eva.style.footerControl}
                size="small"
                status="basic"
              >
                Senare
              </Button>
              <Button
                onPress={() => {
                  registerDevice()
                }}
                style={eva.style.footerControl}
                size="small"
              >
                Jag gör det nu!
              </Button>
            </View>
          </Card>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
}

export const SetupNotifications = withStyles(
  SetupNotificationsComponent,
  (theme) => ({
    icon: {
      width: 64,
      height: 64,
    },
    headerImage: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    headerTextContainer: {
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme['background-basic-color-1'],
    },
    image: {
      width: 100,
      height: 100,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    footerControl: {
      marginHorizontal: 4,
    },
  })
)
