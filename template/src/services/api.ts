import ky from 'ky'
import Config from 'react-native-config'

export const instance = ky.extend({
  prefixUrl: Config.API_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 10000,
})
