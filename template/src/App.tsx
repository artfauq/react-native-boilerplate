import './lib/i18n'
import './utils/ignoreWarnings'

import React, { useCallback, useEffect } from 'react'

import NetInfo from '@react-native-community/netinfo'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import * as Sentry from '@sentry/react-native'
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
  focusManager,
} from '@tanstack/react-query'
import { AppState, AppStateStatus, Platform, useColorScheme, ViewStyle } from 'react-native'
import BootSplash from 'react-native-bootsplash'
import codePush from 'react-native-code-push'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'

import { storage } from '@app/utils'

import Config from './config'
import { AppNavigator } from './navigators'
import { ErrorBoundary } from './screens/ErrorScreen/ErrorBoundary'
import { initCrashReporting } from './utils/crashReporting'
import { navigationRef, useNavigationPersistence } from './utils/navigation'

if (__DEV__) {
  require('./devtools/ReactotronConfig')
}

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

initCrashReporting(routingInstrumentation)

const queryClient = new QueryClient()

const App: React.FC = () => {
  const colorScheme = useColorScheme()
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage)

  const onAppStateChange = useCallback((status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active')
    }
  }, [])

  const onNavigationReady = useCallback(() => {
    if (!navigationRef.isReady()) return

    // routeNameRef.current = navigationRef.getCurrentRoute()?.name

    routingInstrumentation.registerNavigationContainer(navigationRef)

    BootSplash.hide({ fade: true }).catch(() => {
      console.warn('Failed to hide splash screen')
    })
  }, [])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)

    return () => subscription.remove()
  }, [onAppStateChange])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      onlineManager.setOnline(!!state.isConnected)
    })

    return () => unsubscribe()
  }, [])

  if (!isNavigationStateRestored) return null

  return (
    <Sentry.TouchEventBoundary>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorBoundary catchErrors={Config.catchErrors}>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={$container}>
              <NavigationContainer
                initialState={initialNavigationState}
                linking={Config.linking}
                onReady={onNavigationReady}
                onStateChange={onNavigationStateChange}
                ref={navigationRef}
                theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
              >
                <AppNavigator />
              </NavigationContainer>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </Sentry.TouchEventBoundary>
  )
}

export default codePush(Sentry.wrap(App))

const $container: ViewStyle = {
  flex: 1,
}
