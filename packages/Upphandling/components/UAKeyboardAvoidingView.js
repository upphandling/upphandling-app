import React from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'

export const UAKeyboardAvoidingView = ({ children }) => {
  const isIos = Platform.OS === 'ios'
  if (isIos) return KeyboardAvoidingView
  else return View
}
