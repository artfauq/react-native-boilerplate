import React, { ReactElement } from 'react'

import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native'

import { ExtendedEdge, useSafeAreaInsetsStyle } from '@app/hooks/useSafeAreaInsetsStyle'
import { isRTL } from '@app/lib/i18n'
import { colors, spacing } from '@app/theme'

import { Icon, IconTypes } from './Icon'
import { Text } from './Text'

export interface HeaderProps {
  /**
   * The layout of the title relative to the action components.
   * - `center` will force the title to always be centered relative to the header. If the title or the action buttons are too long, the title will be cut off.
   * - `flex` will attempt to center the title relative to the action buttons. If the action buttons are different widths, the title will be off-center relative to the header.
   */
  titleMode?: 'center' | 'flex'
  /**
   * Optional title style override.
   */
  titleStyle?: StyleProp<TextStyle>
  /**
   * Optional outer title container style override.
   */
  titleContainerStyle?: StyleProp<ViewStyle>
  /**
   * Optional inner header wrapper style override.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Optional outer header container style override.
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Background color
   */
  backgroundColor?: string
  /**
   * Title text to display if not using `tx` or nested components.
   */
  title?: string
  /**
   * Icon that should appear on the left.
   * Can be used with `onLeftPress`.
   */
  leftIcon?: IconTypes
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string
  /**
   * Left action text to display if not using `leftTx`.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftText?: string
  /**
   * Left action custom ReactElement if the built in action props don't suffice.
   * Overrides `leftIcon`, `leftTx` and `leftText`.
   */
  LeftActionComponent?: ReactElement
  /**
   * What happens when you press the left icon or text action.
   */
  onLeftPress?: TouchableOpacityProps['onPress']
  /**
   * Icon that should appear on the right.
   * Can be used with `onRightPress`.
   */
  rightIcon?: IconTypes
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string
  /**
   * Right action text to display if not using `rightTx`.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightText?: string
  /**
   * Right action custom ReactElement if the built in action props don't suffice.
   * Overrides `rightIcon`, `rightTx` and `rightText`.
   */
  RightActionComponent?: ReactElement
  /**
   * What happens when you press the right icon or text action.
   */
  onRightPress?: TouchableOpacityProps['onPress']
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[]
}

interface HeaderActionProps {
  backgroundColor?: string
  icon?: IconTypes
  iconColor?: string
  text?: string
  onPress?: TouchableOpacityProps['onPress']
  ActionComponent?: ReactElement
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 * The Header is meant to be used with the `screenOptions.header` option on navigators, routes, or screen components via `navigation.setOptions({ header })`.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Header.md)
 */
export function Header(props: HeaderProps) {
  const {
    backgroundColor = colors.background,
    containerStyle: $containerStyleOverride,
    LeftActionComponent,
    leftIcon,
    leftIconColor,
    leftText,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightIcon,
    rightIconColor,
    rightText,
    safeAreaEdges = ['top'],
    style: $styleOverride,
    title,
    titleContainerStyle: $titleContainerStyleOverride,
    titleMode = 'center',
    titleStyle: $titleStyleOverride,
  } = props

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  return (
    <View style={[$container, $containerInsets, { backgroundColor }, $containerStyleOverride]}>
      <View style={[$wrapper, $styleOverride]}>
        <HeaderAction
          text={leftText}
          icon={leftIcon}
          iconColor={leftIconColor}
          onPress={onLeftPress}
          backgroundColor={backgroundColor}
          ActionComponent={LeftActionComponent}
        />

        {!!title && (
          <View
            style={[
              titleMode === 'center' && $titleWrapperCenter,
              titleMode === 'flex' && $titleWrapperFlex,
              $titleContainerStyleOverride,
            ]}
            pointerEvents="none"
          >
            <Text weight="medium" size="md" style={[$title, $titleStyleOverride]}>
              {title}
            </Text>
          </View>
        )}

        <HeaderAction
          text={rightText}
          icon={rightIcon}
          iconColor={rightIconColor}
          onPress={onRightPress}
          backgroundColor={backgroundColor}
          ActionComponent={RightActionComponent}
        />
      </View>
    </View>
  )
}

function HeaderAction(props: HeaderActionProps) {
  const { backgroundColor, icon, text, onPress, ActionComponent, iconColor } = props

  if (ActionComponent) return ActionComponent

  if (text) {
    return (
      <TouchableOpacity
        style={[$actionTextContainer, { backgroundColor }]}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
      >
        <Text weight="medium" size="md" style={$actionText}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  if (icon) {
    return (
      <Icon
        size={24}
        icon={icon}
        color={iconColor}
        onPress={onPress}
        containerStyle={[$actionIconContainer, { backgroundColor }]}
        style={isRTL ? { transform: [{ rotate: '180deg' }] } : {}}
      />
    )
  }

  return <View style={[$actionFillerContainer, { backgroundColor }]} />
}

const $wrapper: ViewStyle = {
  height: 56,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const $container: ViewStyle = {
  width: '100%',
}

const $title: TextStyle = {
  textAlign: 'center',
}

const $actionTextContainer: ViewStyle = {
  flexGrow: 0,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  paddingHorizontal: spacing.md,
  zIndex: 2,
}

const $actionText: TextStyle = {
  color: colors.tint,
}

const $actionIconContainer: ViewStyle = {
  flexGrow: 0,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  paddingHorizontal: spacing.md,
  zIndex: 2,
}

const $actionFillerContainer: ViewStyle = {
  width: 16,
}

const $titleWrapperCenter: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  position: 'absolute',
  paddingHorizontal: spacing.xxl,
  zIndex: 1,
}

const $titleWrapperFlex: ViewStyle = {
  justifyContent: 'center',
  flexGrow: 1,
}
