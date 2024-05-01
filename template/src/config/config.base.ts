import { LinkingOptions } from '@react-navigation/native'
import Config from 'react-native-config'
import {
  getApplicationName,
  getBuildNumber,
  getBundleId,
  getVersion,
} from 'react-native-device-info'

import { AppStackParamList } from '@app/types/navigation'

export interface ConfigBaseProps {
  appName: string
  buildNumber: string
  bundleId: string
  catchErrors: 'always' | 'dev' | 'prod' | 'never'
  exitRoutes: string[]
  linking: LinkingOptions<AppStackParamList>
  persistNavigation: 'always' | 'dev' | 'prod' | 'never'
  versionNumber: string
}

export type PersistNavigationConfig = ConfigBaseProps['persistNavigation']

const BaseConfig: ConfigBaseProps = {
  /**
   * Name of the application
   */
  appName: getApplicationName(),

  /**
   * Build number of the application
   */
  buildNumber: getBuildNumber(),

  /**
   * Bundle ID of the application
   */
  bundleId: getBundleId(),

  /**
   * Web linking configuration
   */
  linking: {
    prefixes: [`${Config.DEEP_LINK_SCHEME}://`, `https://${Config.DEEP_LINK_HOST}`],
    config: {
      screens: {
        Welcome: 'welcome',
      },
    },
  },

  /**
   * This feature is particularly useful in development mode, but can be used in production
   * as well if you prefer.
   */
  persistNavigation: 'dev',

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: 'always',

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ['Welcome'],

  /**
   * Version number of the application
   */
  versionNumber: getVersion(),
}

export default BaseConfig
