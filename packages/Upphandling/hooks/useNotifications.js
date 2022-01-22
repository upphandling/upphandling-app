import { useQuery } from 'react-query'
import { getNotificationsForDevice } from '../api/notifications'

export const useNotifications = () => {
  return useQuery(['notifications'], () => getNotificationsForDevice())
}
