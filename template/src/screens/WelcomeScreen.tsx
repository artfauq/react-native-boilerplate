import React from 'react'

import { useTranslation } from 'react-i18next'
import { Image, ImageStyle, TextStyle, View, ViewStyle } from 'react-native'

import { Button, Text } from '@app/components'
import { useSafeAreaInsetsStyle } from '@app/hooks/useSafeAreaInsetsStyle'
import { colors, spacing } from '@app/theme'
import { WelcomeScreenProps } from '@app/types/navigation'
import welcomeLogo from '@assets/images/logo.png'

export const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  const { t } = useTranslation<['screens']>()
  const $bottomContainerInsets = useSafeAreaInsetsStyle(['bottom'])

  return (
    <View accessibilityLabel="welcome_screen" style={$container} testID="welcome_screen">
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text style={$welcomeHeading} preset="heading">
          {t('screens:home.title')}
        </Text>
        <Text preset="subheading">welcomeScreen.exciting</Text>
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text size="md">{t('screens:home.gettingStarted')}</Text>
        <Button preset="reversed">Go</Button>
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flex: 1,
  flexBasis: '60%',
  justifyContent: 'center',
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flex: 0,
  flexBasis: '40%',
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: 'space-around',
}

const $welcomeLogo: ImageStyle = {
  height: 120,
  width: '100%',
  marginBottom: spacing.xxl,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
