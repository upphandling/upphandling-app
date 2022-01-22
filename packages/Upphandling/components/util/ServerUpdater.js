'use strict'

import React, { useEffect } from 'react'
import { createDevice } from '../../api/device'
import { useMutation } from 'react-query'
import { refreshToken } from '../../lib/NotifService'

let old_token = ''
export const ServerUpdater = ({ children }) => {
  const createDeviceMutation = useMutation(createDevice)
  useEffect(() => {
    refreshToken().then((token) => {
      if (old_token !== token) {
        createDeviceMutation.mutateAsync({ pushToken: token })
        old_token = token
      }
    })
  })
  return <>{children}</>
}
