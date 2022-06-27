import React from 'react'
import { Layout, Spinner, withStyles } from '@ui-kitten/components'

const LoadingComp = ({ eva }) => {
  return (
    <Layout style={eva.style.layout} level="1">
      <Spinner style={eva.style.spinner} />
    </Layout>
  )
}
export const Loading = withStyles(LoadingComp, (theme) => ({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginBottom: 36,
  },
}))
