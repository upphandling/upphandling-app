import { useQuery } from 'react-query'
import { getNotificationsForDevice } from '../api/notifications'
import { getUniqueId } from 'react-native-device-info'

export const useNotifications = () => {
  return useQuery(['notifications'], () =>
    getNotificationsForDevice(getUniqueId())
  )
}
