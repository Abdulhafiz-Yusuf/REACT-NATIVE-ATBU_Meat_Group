import 'react-native-gesture-handler';
import { AdminScreen, UserMenu, AdminStockScreen, AdminStockSummary, CartScreen, OrderingScreen, ProfileScreen } from '../src/screens'

const Drawer = createDrawerNavigator();
import * as React from 'react';
import { Button, View } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import firebase, { db } from '../src/firebase/FirebaseConfig';
import { MainStack } from './MainStackNavigator';
import { userStore } from '../src/AppStore/UserStore';
import Header from './Header';
import { Logout } from '../src/AppStore/actions/UserActions';


const DrawerNavigation = ({ user }) => {
    const { dispatch } = React.useContext(userStore)
    function CustomDrawerContent(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Logout"
                    onPress={() => {
                        firebase.auth().signOut()
                        dispatch({
                            type: 'LOGOUT',
                        })
                        props.navigation.closeDrawer()
                    }

                    }
                />

            </DrawerContentScrollView>
        );
    }




    return (


        user.fullName === 'admin' ?
            // Admin Menu
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name="Home"
                    options={{
                        headerTitle: props => <Header {...props} />
                    }}
                    component={AdminScreen} initialParams={{ user: user }}
                />
                <Drawer.Screen name="Stocking"
                    options={{
                        headerTitle: props => <Header {...props} />
                    }}
                    component={AdminStockScreen}
                    initialParams={{ user: user }}
                />

                <Drawer.Screen name="Stock Summary"
                    options={{
                        headerTitle: props => <Header {...props} />
                    }}
                    component={AdminStockSummary}
                    initialParams={{ user: user }}
                />

            </Drawer.Navigator >
            :
            // User Menu
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}

            // screenOptions={{
            //     gestureEnabled: false,
            //      title: 'ATBU Meat Group'
            // }}
            >
                <Drawer.Screen name="Home"
                    options={{
                        headerTitle: props => <Header {...props} />
                    }}
                    component={OrderingScreen} initialParams={{ user: user }}
                />
                <Drawer.Screen name="Cart"
                    options={{
                        headerTitle: props => <Header {...props} />
                    }}
                    component={CartScreen}
                />
                <Drawer.Screen name="Profile"
                    options={{
                        headerTitle: props => <Header {...props} />
                    }}
                    component={ProfileScreen}
                />
            </Drawer.Navigator >
    );
}

export default DrawerNavigation;




