/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@app': './src',
          '@assets': './assets',
        },
        extensions: ['.js', '.json'],
      },
    ],
    'inline-dotenv',

    /**
     * react-native-reanimated web support
     * @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web
     */
    '@babel/plugin-proposal-export-namespace-from',

    /**
     * NOTE: This must be last in the plugins
     * @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#babel-plugi
     */
    'react-native-reanimated/plugin',
  ],
}
