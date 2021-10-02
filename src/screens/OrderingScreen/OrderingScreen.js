
import React, { useState, useEffect, useContext } from 'react'
import { Image, Text, TouchableOpacity, BackHandler, View } from 'react-native'
import styles from './styles';
import { Icon, withBadge } from 'react-native-elements'

import LoadScreen from '../../components/LoadScreen';
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import { userStore } from '../../AppStore/UserStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
import { addToCart, addToCartorUpdateCart, fetchAPIforOrderScreen, Logout } from '../../AppStore/actions/UserActions'
import firebase from '../../firebase/FirebaseConfig';

import OrderCard from '../../components/OrderCard'




export default function OrderingScreen(props) {
    const [index, setIndex] = useState()
    const { state, dispatch } = useContext(userStore)
    let user = props.route.params.user

    const [tempOrderQty, settempOrderQty] = useState()

    const [Quantity, setQuantity] = useState(1)
    const [Month, setMonth] = useState('January')
    const [CollectionPoint, setCollectionPoint] = useState('ATBU Farm')
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const [totalInCart, setTotalInCart] = useState()
    const [AllinStock, setAllinStock] = useState([])

    const onGotoScreen = (screen) => {
        props.navigation.navigate(screen)
    };


    const onLogout = () => {
        firebase.auth().signOut().then(() => {
            dispatch({
                type: 'LOGOUT',
            })

        }).catch((error) => {
            // An error happened.
        });
    }


    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    useEffect(() => {
        fetchAPIforOrderScreen(dispatch, user, setTotalInCart, setAllinStock)

        const willFocusSubscription = props.navigation.addListener('focus', () => {
            fetchAPIforOrderScreen(dispatch, user, setTotalInCart, setAllinStock)
        });

        return willFocusSubscription;

    }, [])

    const onAddtoCartPress = (item, totalPrice, index) => {
        setLoading(true)
        //const timestamp = Firebase.firestore.FieldValue.serverTimestamp();
        if (tempOrderQty[index].counter > item.itemQty) {
            alert('You can not order more than available quantity in stock')
        }
        else {
            const data = {
                user: user.id,
                oid: nanoid(5),
                item: item,
                collectionPoint: 'ATBU Farm',
                totalPrice: Math.round(parseInt(tempOrderQty[index].counter) * parseInt(item.itemAmount)),
                orderQty: tempOrderQty[index].counter,
                pstatus: 'pending'
            };
            addToCartorUpdateCart(props, dispatch, user, item, tempOrderQty, index, setLoading, data)

        }

    }
    const renderButton = () => {

        if (Loading) {
            return <LoadScreen size='small' text={'Adding to cart...'} />
        }

        if (!Loading) {
            return (
                <View style={styles.btncontainer} >
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={onAddtoCartPress}>
                        <Text style={styles.buttonTitle}>Add to Cart</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                                style={styles.btn}
                                onPress={() => onBuyPress()}>
                                <Text style={styles.buttonTitle}>Buy</Text>
                            </TouchableOpacity> */}

                </ View>
            )
        }

    }
    const badgeFigure = totalInCart
    // withBadge HOC
    const BadgedIcon = withBadge(badgeFigure)(Icon)


    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>

            {
                totalInCart === null ?
                    <LoadScreen />
                    :
                    <View style={styles.container}>
                        <KeyboardAwareScrollView
                            style={{ flex: 1, width: '100%' }}
                            keyboardShouldPersistTaps="always">
                            {/* <Image
                                style={styles.logo}
                                source={require('../../../asset/logo.jpg')}
                            /> */}

                            <View style={styles.userContainer}>
                                {/* <Text style={styles.userName}>Hi! {user.fullName}</Text> */}
                                <Text style={styles.userInstruction}> Please fill in all field below to place and order</Text>
                            </View>

                            <View>

                                <OrderCard
                                    btnActionHandler={(item, totalPrice, index) => onAddtoCartPress(item, totalPrice, index)}
                                    page='user'
                                    setTempCounterValue={settempOrderQty}
                                    AllinStock={AllinStock}
                                />


                            </View>
                            <Text style={styles.errorText}>
                                {error}
                            </Text>


                            {renderButton()}

                            <View style={styles.iconContainer} >
                                <Icon
                                    raised
                                    name='user'
                                    type='font-awesome'
                                    onPress={() => onGotoScreen('Profile')}
                                />


                                < BadgedIcon
                                    raised
                                    name='shopping-cart'
                                    type='font-awesome'
                                    onPress={() => onGotoScreen('Cart')}
                                />

                                <Icon
                                    raised
                                    name='logout'
                                    type='material-design'
                                    onPress={onLogout}
                                />

                            </ View>

                        </KeyboardAwareScrollView>
                    </View >

            }



        </View >

    )
}
