import type { Locale } from 'date-fns'
import { format } from 'date-fns/format'
import { enUS } from 'date-fns/locale/en-US'
import { fr } from 'date-fns/locale/fr'
import { parseISO } from 'date-fns/parseISO'

import i18n from '@app/lib/i18n'

type Options = Parameters<typeof format>[2]

const getLocale = (): Locale => {
  const locale = i18n.language.split('-')[0]

  return locale === 'fr' ? fr : enUS
}

export const formatDate = (date: string, dateFormat?: string, options?: Options) => {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }

  return format(parseISO(date), dateFormat ?? 'MMM dd, yyyy', dateOptions)
}
