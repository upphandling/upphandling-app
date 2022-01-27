import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const DEFAULT_OVERLAY_COLOR = 'rgba(53,34,171,0.4)'

export const ImageOverlay = ({
  style,
  children,
  onPress,
  ...imageBackgroundProps
}) => {
  const { overlayColor, ...imageBackgroundStyle } = StyleSheet.flatten(style)

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground {...imageBackgroundProps} style={imageBackgroundStyle}>
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR },
          ]}
        />
        {children}
      </ImageBackground>
    </TouchableOpacity>
  )
}
