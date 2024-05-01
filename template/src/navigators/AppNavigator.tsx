import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Config from '@app/config'
import * as Screens from '@app/screens'
import { colors } from '@app/theme'
import { AppStackParamList } from '@app/types/navigation'
import { useBackButtonHandler } from '@app/utils/navigation'

const Stack = createNativeStackNavigator<AppStackParamList>()

export const AppNavigator: React.FC = () => {
  useBackButtonHandler(routeName => Config.exitRoutes.includes(routeName))

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
      }}
    >
      <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
    </Stack.Navigator>
  )
}
