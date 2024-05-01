import * as Sentry from '@sentry/react-native'
import codePush from 'react-native-code-push'

import Config from '@app/config'

export const initCrashReporting = (
  routingInstrumentation: Sentry.ReactNavigationInstrumentation,
) => {
  Sentry.init({
    dist: Config.buildNumber,
    dsn: 'https://923a1bd372a1c3ceaaeeb160a4f83760@o1169141.ingest.us.sentry.io/4507056870457344',
    debug: __DEV__,
    enabled: !__DEV__,
    integrations: [new Sentry.ReactNativeTracing({ routingInstrumentation })],
    release: Config.versionNumber,
    tracesSampleRate: 0.5,
  })

  codePush
    .getUpdateMetadata()
    .then(update => {
      if (update) {
        Sentry.setDist(`codepush_${update.label}`)
      }

      return undefined
    })
    .catch(err => {
      console.log('Error getting codepush update metadata', err)
    })
}

/**
 * Error classifications used to sort errors on error reporting services.
 */
export enum ErrorType {
  /**
   * An error that would normally cause a red screen in dev
   * and force the user to sign out and restart.
   */
  FATAL = 'Fatal',
  /**
   * An error caught by try/catch where defined using Reactotron.tron.error.
   */
  HANDLED = 'Handled',
}

/**
 * Manually report a handled error.
 */
export const reportCrash = (error: Error, type: ErrorType = ErrorType.FATAL) => {
  if (__DEV__) {
    // Log to console and Reactotron in development
    const message = error.message || 'Unknown'

    console.error(error)
    console.log(message, type)
    console.tron.log(error)
  } else {
    Sentry.captureException(error)
  }
}
