import React, { useEffect, useLayoutEffect } from 'react'

import { useNavigation } from '@react-navigation/native'

import { Header, HeaderProps } from '../components'

/**
 * A hook that can be used to easily set the Header of a react-navigation screen from within the screen's component.
 *
 * @see https://github.com/infinitered/ignite/blob/master/docs/boilerplate/app/utils/useHeader.tsx.md
 */
export function useHeader(
  headerProps: HeaderProps,
  deps: Parameters<typeof useLayoutEffect>[1] = [],
) {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header {...headerProps} />,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, headerProps, navigation])
}
