import React from 'react'

import { useTranslation } from 'react-i18next'
import { Image, ImageProps, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from 'react-native'

import { spacing } from '@app/theme'
import sadFace from '@assets/images/sad-face.png'

import { Button, ButtonProps } from './Button'
import { Text, TextProps } from './Text'

interface EmptyStateProps {
  /**
   * Style override for the container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An Image source to be displayed above the heading.
   */
  imageSource?: ImageProps['source']
  /**
   * Style overrides for image.
   */
  imageStyle?: StyleProp<ImageStyle>
  /**
   * Pass any additional props directly to the Image component.
   */
  ImageProps?: Omit<ImageProps, 'source'>
  /**
   * The heading text to display if not using `headingTx`.
   */
  heading?: string
  /**
   * Style overrides for heading text.
   */
  headingStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the heading Text component.
   */
  HeadingTextProps?: TextProps
  /**
   * The content text to display if not using `contentTx`.
   */
  content?: string
  /**
   * Style overrides for content text.
   */
  contentStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the content Text component.
   */
  ContentTextProps?: TextProps
  /**
   * The button text to display if not using `buttonTx`.
   */
  button?: string
  /**
   * Style overrides for button.
   */
  buttonStyle?: ButtonProps['style']
  /**
   * Style overrides for button text.
   */
  buttonTextStyle?: ButtonProps['textStyle']
  /**
   * Called when the button is pressed.
   */
  buttonOnPress?: ButtonProps['onPress']
  /**
   * Pass any additional props directly to the Button component.
   */
  ButtonProps?: ButtonProps
}

interface EmptyStatePresetItem {
  imageSource: ImageProps['source']
  heading: string
  content: string
  button: string
}

/**
 * A component to use when there is no data to display. It can be utilized to direct the user what to do next.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-EmptyState.md)
 */
export function EmptyState(props: EmptyStateProps) {
  const { t } = useTranslation()

  const {
    button = t('empty.content'),
    buttonOnPress,
    ButtonProps,
    buttonStyle: $buttonStyleOverride,
    buttonTextStyle: $buttonTextStyleOverride,
    content = t('empty.content'),
    contentStyle: $contentStyleOverride,
    ContentTextProps,
    heading = t('empty.heading'),
    headingStyle: $headingStyleOverride,
    HeadingTextProps,
    ImageProps,
    imageSource = sadFace,
    imageStyle: $imageStyleOverride,
    style: $containerStyleOverride,
  } = props

  const isImagePresent = !!imageSource
  const isHeadingPresent = !!heading
  const isContentPresent = !!content
  const isButtonPresent = !!button

  const $containerStyles = [$containerStyleOverride]
  const $imageStyles = [
    $image,
    (isHeadingPresent || isContentPresent || isButtonPresent) && { marginBottom: spacing.xxxs },
    $imageStyleOverride,
    ImageProps?.style,
  ]
  const $headingStyles = [
    $heading,
    isImagePresent && { marginTop: spacing.xxxs },
    (isContentPresent || isButtonPresent) && { marginBottom: spacing.xxxs },
    $headingStyleOverride,
    HeadingTextProps?.style,
  ]
  const $contentStyles = [
    $content,
    (isImagePresent || isHeadingPresent) && { marginTop: spacing.xxxs },
    isButtonPresent && { marginBottom: spacing.xxxs },
    $contentStyleOverride,
    ContentTextProps?.style,
  ]
  const $buttonStyles = [
    (isImagePresent || isHeadingPresent || isContentPresent) && { marginTop: spacing.xl },
    $buttonStyleOverride,
    ButtonProps?.style,
  ]

  return (
    <View style={$containerStyles}>
      {isImagePresent && <Image source={imageSource} {...ImageProps} style={$imageStyles} />}

      {isHeadingPresent && (
        <Text preset="subheading" {...HeadingTextProps} style={$headingStyles}>
          {heading}
        </Text>
      )}

      {isContentPresent && (
        <Text {...ContentTextProps} style={$contentStyles}>
          {content}
        </Text>
      )}

      {isButtonPresent && (
        <Button
          onPress={buttonOnPress}
          textStyle={$buttonTextStyleOverride}
          {...ButtonProps}
          style={$buttonStyles}
        >
          {button}
        </Button>
      )}
    </View>
  )
}

const $image: ImageStyle = { alignSelf: 'center' }
const $heading: TextStyle = { textAlign: 'center', paddingHorizontal: spacing.lg }
const $content: TextStyle = { textAlign: 'center', paddingHorizontal: spacing.lg }
