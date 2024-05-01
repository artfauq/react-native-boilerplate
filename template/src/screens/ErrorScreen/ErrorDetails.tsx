import React, { ErrorInfo } from 'react'

import { useTranslation } from 'react-i18next'
import { ScrollView, TextStyle, View, ViewStyle } from 'react-native'

import { Button, Icon, Screen, Text } from '@app/components'
import { colors, spacing } from '@app/theme'

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset(): void
}

export const ErrorDetails: React.FC<ErrorDetailsProps> = ({ error, errorInfo, onReset }) => {
  const { t } = useTranslation<['screens']>()

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['top', 'bottom']}
      contentContainerStyle={$contentContainer}
    >
      <View style={$topSection}>
        <Icon icon="ladybug" size={64} />
        <Text style={$heading} preset="subheading">
          {t('screens:error.title')}
        </Text>
        <Text>{t('screens:error.friendlySubtitle')}</Text>
      </View>

      <ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>
        <Text style={$errorContent} weight="bold">
          {`${error.message}`.trim()}
        </Text>
        <Text selectable style={$errorBacktrace}>
          {`${errorInfo?.componentStack ?? ''}`.trim()}
        </Text>
      </ScrollView>

      <Button preset="reversed" style={$resetButton} onPress={onReset}>
        {t('screens:error.reset')}
      </Button>
    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  alignItems: 'center',
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  flex: 1,
}

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: 'center',
}

const $heading: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
}

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: colors.separator,
  marginVertical: spacing.md,
  borderRadius: 6,
}

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.md,
}

const $errorContent: TextStyle = {
  color: colors.error,
}

const $errorBacktrace: TextStyle = {
  marginTop: spacing.md,
  color: colors.textDim,
}

const $resetButton: ViewStyle = {
  backgroundColor: colors.error,
  paddingHorizontal: spacing.xxl,
}
