import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import {
  Button,
  Card,
  Icon,
  Layout,
  Text,
  useTheme,
  withStyles,
} from '@ui-kitten/components'
import { translate } from '../lib/translate'

const FixNotificationsComponent = ({ navigation, eva }) => {
  const theme = useTheme()

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
          <Card style={{ flex: 1, marginHorizontal: 4 }} status="info">
            <View style={eva.style.headerImage}>
              <Icon
                style={eva.style.icon}
                fill={theme[`color-info-default`]}
                name="bell-outline"
              />
            </View>
            <View style={eva.style.headerTextContainer}>
              <Text style={{ textAlign: 'center', marginBottom: 16 }}>
                {translate('FixNotifications.text')}
              </Text>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {translate('FixNotifications.cta_text')}
              </Text>
            </View>
            <View style={eva.style.footerContainer}>
              <Button
                onPress={() => {
                  navigation.replace('Home')
                }}
                style={eva.style.footerControl}
                size="small"
                status="basic"
                appearance="ghost"
              >
                {translate('FixNotifications.later_button')}
              </Button>
            </View>
          </Card>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
}

export const FixNotifications = withStyles(
  FixNotificationsComponent,
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
