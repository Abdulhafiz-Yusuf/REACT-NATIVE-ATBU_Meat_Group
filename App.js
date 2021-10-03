import 'react-native-gesture-handler';
import React from 'react'

import { Provider as PaperProvider } from 'react-native-paper';
import UserContextProvider from './src/AppStore/UserStore'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './navigation/AuthNavigator';






export default function App() {
  return (
    <PaperProvider>
      <UserContextProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer >
      </UserContextProvider >
    </PaperProvider >
  );
}


