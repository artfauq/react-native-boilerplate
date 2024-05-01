declare module 'react-native-config' {
  export interface NativeConfig {
    APP_ID: string
    APP_NAME: string
    API_URL: string
    DEEP_LINK_HOST: string
    DEEP_LINK_SCHEME: string
  }

  export const Config: NativeConfig
  export default Config
}
