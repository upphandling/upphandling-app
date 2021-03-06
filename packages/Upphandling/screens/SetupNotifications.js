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
import { translate } from '../lib/translate'

const SetupNotificationsComponent = ({ navigation, eva }) => {
  const [notificationStatus, setNotificationStatus] = useState('primary')
  const theme = useTheme()
  const addDeviceMutation = useMutation(createDevice)
  const skipRegistering = () => {
    navigation.replace('Home')
  }

  const registerDevice = async () => {
    requestPermissions(addDeviceMutation)
      .then(async (token) => {
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
          backgroundColor: theme['background-basic-color-2'],
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
                {translate('SetupNotifications.text')}
              </Text>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {translate('SetupNotifications.cta_text')}
              </Text>
            </View>
            <View style={eva.style.footerContainer}>
              <Button
                onPress={skipRegistering}
                style={eva.style.footerControl}
                size="small"
                status="basic"
              >
                {translate('SetupNotifications.defer_button')}
              </Button>
              <Button
                onPress={() => {
                  registerDevice()
                }}
                style={eva.style.footerControl}
                size="small"
              >
                {translate('SetupNotifications.cta_button')}
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
      backgroundColor: theme['background-basic-color-2'],
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
