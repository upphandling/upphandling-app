import React from 'react'
import {
  Button,
  Card,
  CheckBox,
  StyleService,
  Text,
} from '@ui-kitten/components'

export const Tag = ({children}) => (
  <Button
    style={styles.tag}
    appearance="outline"
    size="tiny"
  >
    {children}
  </Button>
)



const styles = StyleService.create({
  tag: {
    borderRadius: 16,
  },
})
