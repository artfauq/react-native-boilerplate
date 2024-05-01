/**
 * This file does the setup for integration with Reactotron, which is a
 * free desktop app for inspecting and debugging your React Native app.
 * @see https://github.com/infinitered/reactotron
 */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform, NativeModules } from 'react-native'
import { ArgType } from 'reactotron-core-client'

import { storage } from '@app/utils'
import { goBack, resetRoot, navigate } from '@app/utils/navigation'

import * as packageJson from '../../package.json'

import { Reactotron } from './ReactotronClient'

const reactotron = Reactotron.configure({
  name: packageJson.name,
  host: 'localhost',
  onConnect: () => {
    /** since this file gets hot reloaded, let's clear the past logs every time we connect */
    Reactotron.clear()
  },
})

if (Platform.OS !== 'web') {
  reactotron.setAsyncStorageHandler?.(AsyncStorage)
  reactotron.useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
}

/**
 * Reactotron allows you to define custom commands that you can run
 * from Reactotron itself, and they will run in your app.
 *
 * Define them in the section below with `onCustomCommand`. Use your
 * creativity -- this is great for development to quickly and easily
 * get your app into the state you want.
 *
 * NOTE: If you edit this file while running the app, you will need to do a full refresh
 * or else your custom commands won't be registered correctly.
 */
reactotron.onCustomCommand({
  title: 'Show Dev Menu',
  description: 'Opens the React Native dev menu',
  command: 'showDevMenu',
  handler: () => {
    Reactotron.log('Showing React Native dev menu')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    NativeModules.DevMenu.show()
  },
})

reactotron.onCustomCommand({
  title: 'Reset Root Store',
  description: 'Resets the MST store',
  command: 'resetStore',
  handler: () => {
    Reactotron.log('resetting store')
    storage.clear().catch(err => {
      Reactotron.error('Failed to clear storage', err)
    })
  },
})

reactotron.onCustomCommand({
  title: 'Reset Navigation State',
  description: 'Resets the navigation state',
  command: 'resetNavigation',
  handler: () => {
    Reactotron.log('resetting navigation state')
    resetRoot({ index: 0, routes: [] })
  },
})

reactotron.onCustomCommand<[{ name: 'route'; type: ArgType.String }]>({
  command: 'navigateTo',
  handler: args => {
    const { route } = args ?? {}

    if (route) {
      Reactotron.log(`Navigating to: ${route}`)
      navigate(route as any) // this should be tied to the navigator, but since this is for debugging, we can navigate to illegal routes
    } else {
      Reactotron.log('Could not navigate. No route provided.')
    }
  },
  title: 'Navigate To Screen',
  description: 'Navigates to a screen by name.',
  args: [{ name: 'route', type: ArgType.String }],
})

reactotron.onCustomCommand({
  title: 'Go Back',
  description: 'Goes back',
  command: 'goBack',
  handler: () => {
    Reactotron.log('Going back')
    goBack()
  },
})

console.tron = reactotron

declare global {
  interface Console {
    tron: typeof reactotron
  }
}

/**
 * For our last trick, we are going to monkey patching console to also output to Reactotron.
 */
const ogConsoleLog = console.log

console.log = (...args: Parameters<typeof console.log>) => {
  ogConsoleLog(...args)
  reactotron.log(...args)
}

const ogConsoleWarn = console.warn

console.warn = (...args: Parameters<typeof console.warn>) => {
  ogConsoleWarn(...args)
  reactotron.warn(args[0])
}

const ogConsoleError = console.error

console.error = (...args: Parameters<typeof console.error>) => {
  ogConsoleError(...args)

  if (args[0] instanceof Error) {
    reactotron.error(args[0].message, args[0].stack)
  } else {
    reactotron.error(args[0], args[1])
  }
}

const ogConsoleDebug = console.debug

console.debug = (...args: Parameters<typeof console.debug>) => {
  ogConsoleDebug(...args)
  reactotron.debug(args[0])
}

/**
 * Now that we've setup all our Reactotron configuration, let's connect!
 */
reactotron.connect()
