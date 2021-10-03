import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AdminScreen, CartScreen, HomeScreen, LoginScreen, OrderDetailScreen, OrderingScreen, ProfileScreen, SignupScreen } from '../src/screens'


const SwitchNavigator = createStackNavigator(
	{

		Admin: { screen: AdminScreen },
		Cart: { screen: CartScreen },
		Home: { screen: HomeScreen },
		Login: { screen: LoginScreen },
		OrderDetail: { screen: OrderDetailScreen },
		Ordering: { screen: OrderingScreen },
		Profile: { screen: ProfileScreen },
		Signup: { screen: SignupScreen },


	},
	{
		initialRouteName: 'Login',
		defaultNavigationOptions: {
			title: 'App'
		}
	});
export default createAppContainer(SwitchNavigator)



