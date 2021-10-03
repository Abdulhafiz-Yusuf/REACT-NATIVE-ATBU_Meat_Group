import 'react-native-gesture-handler';
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { AdminScreen, CartScreen, HomeScreen, LoginScreen, OrderingScreen, ProfileScreen, SignupScreen } from '../src/screens'
import Header from './Header';
import PasswordReset from '../src/screens/PasswordReset/PasswordReset';


const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};



const MainStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='Home'
        // screenOptions={{            // headerStyle: {            //   backgroundColor: 'papayawhip', justifyContent            // },
        //     title: 'ATBU Meat Group'
        // }}
        >
            {/* <Stack.Screen name="Admin" component={AdminScreen} /> */}
            {/* <Stack.Screen name="Cart" component={CartScreen} /> */}
            <Stack.Screen name="Home" component={HomeScreen}
                options={({ navigation, route }) => ({
                    headerShown: false
                })}
            />
            <Stack.Screen name="Login" component={LoginScreen}
            // options={{
            //     headerTitle: () => <Header navigation={navigation} />
            // }}
            />

            <Stack.Screen name="Password" component={PasswordReset}
                options={{
                    headerTitle: () => <Header title='Password Reset' />
                }}
            />

            {/* <Stack.Screen name="Ordering" component={OrderingScreen} /> */}
            {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>

    );
}


const LoginStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>

        </Stack.Navigator>
    );

}


export { MainStack, LoginStack }
