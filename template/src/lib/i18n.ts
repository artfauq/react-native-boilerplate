import 'intl-pluralrules'
import i18n, { type CustomTypeOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'react-native-localize'

import * as resources from '@app/locales'

export type AvailableLocale = keyof typeof resources
export type Resources = (typeof resources)[AvailableLocale]

export const defaultLocale: AvailableLocale = 'fr'
export const defaultNS = 'common'

export const deviceLocale = getLocales()[0]
export const { isRTL } = deviceLocale

i18n
  .use(initReactI18next)
  .init({
    debug: __DEV__,
    defaultNS,
    fallbackNS: false,
    fallbackLng: defaultLocale,
    interpolation: {
      escapeValue: false,
    },
    lng: deviceLocale.languageCode,
    resources,
  })
  .catch(err => {
    console.error('Failed to initialize i18n instance', err)
  })

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<CustomTypeOptions['resources']>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
    ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
    : Text

export default i18n
