import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type AppStackParamList = {
  Welcome: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type WelcomeScreenProps = AppStackScreenProps<'Welcome'>
