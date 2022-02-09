import React from 'react'
import { useColorScheme } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppNavigator } from './screens/AppNavigator'
import { QueryClient, QueryClientProvider } from 'react-query'
import darkTheme from './theme/dark.json'
import lightTheme from './theme/light.json'

const queryClient = new QueryClient()
const getUIKittenTheme = (colorScheme) => {
  if (colorScheme === 'dark') {
    return { ...eva.dark, ...darkTheme }
  } else {
    return { ...eva.light, ...lightTheme }
  }
}

export default () => {
  const colorScheme = useColorScheme() || 'dark'
  const theme = getUIKittenTheme(colorScheme)
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppNavigator colorScheme={colorScheme} />
        </QueryClientProvider>
      </ApplicationProvider>
    </>
  )
}
