import React from 'react'
import {ImageBackground, StyleSheet, View} from 'react-native'

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.4)'

export const ImageOverlay = ({style, children, ...imageBackgroundProps}) => {
  const {overlayColor, ...imageBackgroundStyle} = StyleSheet.flatten(style)

  return (
    <ImageBackground {...imageBackgroundProps} style={imageBackgroundStyle}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR},
        ]}
      />
      {children}
    </ImageBackground>
  )
}
