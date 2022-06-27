import React from 'react'
import {
  Button,
  Card,
  CheckBox,
  StyleService,
  Text,
} from '@ui-kitten/components'

export const Tag = ({children, style}) => (
  <Button
    style={[styles.tag, style]}
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
