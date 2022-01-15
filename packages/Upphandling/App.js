import React from 'react'
import { Appearance } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppNavigator } from './screens/AppNavigator'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
const theme = Appearance.getColorScheme() === 'dark' ? eva.dark : eva.light
export default () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppNavigator />
        </QueryClientProvider>
      </ApplicationProvider>
    </>
  )
}
