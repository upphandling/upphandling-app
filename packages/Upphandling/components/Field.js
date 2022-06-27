import React from 'react'
import { StyleSheet } from 'react-native'
import { Divider, Layout, Text } from '@ui-kitten/components'

export const Field = ({style, label, children, value, ...layoutProps}) => {

  return (
    <React.Fragment>
      <Layout level="1" {...layoutProps} style={[styles.container, style]}>
        <Text appearance="hint" category="s2">
          {label}
        </Text>
        <Text category="s2">{value}{children}</Text>
      </Layout>
      <Divider />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
