/**
 * @format
 */

import 'react-native-gesture-handler'

import { AppRegistry } from 'react-native'
import Config from 'react-native-config'

import App from './src/App'

AppRegistry.registerComponent(Config.APP_NAME, () => App)
