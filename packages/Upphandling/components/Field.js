import React from 'react'
import { StyleSheet } from 'react-native'
import { Divider, Layout, Text } from '@ui-kitten/components'

export const Field = ({style, label, value, ...layoutProps}) => {

  return (
    <React.Fragment>
      <Layout level="1" {...layoutProps} style={[styles.container, style]}>
        <Text appearance="hint" category="s2">
          {label}
        </Text>
        <Text category="s2">{value}</Text>
      </Layout>
      <Divider />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
