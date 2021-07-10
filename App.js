import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AdminScreen, CartScreen, HomeScreen, LoginScreen, OrderingScreen, ProfileScreen, SignupScreen } from './src/screens'
import { Provider as PaperProvider } from 'react-native-paper';
import UserContextProvider from './src/AppStore/UserStore'


const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Ordering'
            screenOptions={{            // headerStyle: {            //   backgroundColor: 'papayawhip', justifyContent            // },
              title: 'ATBU Meat Group'
            }} >
            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* <Stack.Screen name="OrderDetail" component={OrderDetailScreen} /> */}
            <Stack.Screen name="Ordering" component={OrderingScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider >
    </PaperProvider>
  );
}


