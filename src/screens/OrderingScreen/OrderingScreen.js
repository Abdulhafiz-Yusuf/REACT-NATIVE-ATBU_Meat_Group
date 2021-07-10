import React, { useState, useEffect, useContext } from 'react'
import { Image, Text, TouchableOpacity, BackHandler, View } from 'react-native'
import styles from './styles';
import { Icon, withBadge } from 'react-native-elements'
import { QuantityData, MonthData, CollectionPointData, } from './Data'
import { Picker } from '@react-native-picker/picker'
import LoadScreen from '../../components/LoadScreen';
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import { userStore } from '../../AppStore/UserStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';

import { addToCart, fetchAPIforOrderScreen } from '../../AppStore/actions/UserActions'


export default function OrderingScreen(props) {

    const { state, dispatch } = useContext(userStore)
    const user = state.user
    // console.log(state)

    const [Quantity, setQuantity] = useState(1)
    const [Month, setMonth] = useState('January')
    const [CollectionPoint, setCollectionPoint] = useState('ATBU Farm')
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [cost, setCost] = useState()

    const [totalInCart, setTotalInCart] = useState()


    const onGotoScreen = (screen) => {
        props.navigation.navigate(screen)
    };
    const onGotoHome = () => {
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        })
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
        fetchAPIforOrderScreen(dispatch, user, setCost, setTotalInCart)
        const willFocusSubscription = props.navigation.addListener('focus', () => {
            fetchAPIforOrderScreen(dispatch, user, setCost, setTotalInCart)
        });
        return willFocusSubscription;
    }, [])

    const onAddtoCartPress = () => {
        setLoading(true)
        //const timestamp = Firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            user: user.id,
            oid: nanoid(5),
            qty: Quantity,
            month: Month,
            cpoint: CollectionPoint,
            cost: Math.round(parseInt(Quantity) * cost),
            pstatus: 'pending'
            //  date: timestamp,
        };
        addToCart(dispatch, data, setLoading, setError, props)
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
                // !cost || totalInCart === null ?
                //     <LoadScreen />
                //     :
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        style={{ flex: 1, width: '100%' }}
                        keyboardShouldPersistTaps="always">
                        <Image
                            style={styles.logo}
                            source={require('../../../asset/logo.jpg')}
                        />

                        <View style={styles.userContainer}>
                            <Text style={styles.userName}>Hi! {user.fullName}</Text>
                            <Text style={styles.userInstruction}> Please fill in all field below to place and order</Text>
                        </View>

                        <View>


                            <View style={{ flex: 1, flexDirection: 'row', width: '95%', marginBottom: 10, marginTop: 10 }}>
                                <Text style={{ fontWeight: 'bold', flex: 1, fontSize: 16, marginLeft: 35 }}>Quantity (Kilogram)</Text>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Picker
                                        style={{
                                            color: '#000',
                                            fontSize: 16,
                                            lineHeight: 23,
                                            flex: 1
                                        }}
                                        selectedValue={Quantity}
                                        onValueChange={(itemValue, itemIndex) => {

                                            setQuantity(itemValue)
                                        }}>
                                        {QuantityData.map((quantity, index) => {
                                            return (
                                                <Picker.Item key={index} label={quantity} value={quantity} />
                                            )
                                        })}
                                    </Picker>

                                </View>

                            </View>
                            <View style={{ marginBottom: 10, marginTop: 10, flex: 1, flexDirection: 'row', width: '95%' }}>
                                <Text style={{ fontWeight: 'bold', flex: 1, fontSize: 16, marginLeft: 35 }}>Month</Text>
                                <Picker
                                    style={{
                                        color: '#000',
                                        fontSize: 16,
                                        lineHeight: 23,
                                        flex: 1
                                    }}
                                    selectedValue={Month}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setMonth(itemValue)
                                    }>
                                    {MonthData.map((month, index) => {
                                        return (
                                            <Picker.Item key={index} label={month} value={month} />
                                        )
                                    })}
                                </Picker>
                            </View>


                            <View style={{ marginBottom: 10, marginTop: 10, flex: 1, flexDirection: 'row', width: '95%' }}>
                                <Text style={{ fontWeight: 'bold', flex: 1, fontSize: 16, marginLeft: 35 }}>Collection Point</Text>
                                <Picker
                                    style={{
                                        color: '#000',
                                        fontSize: 16,
                                        lineHeight: 23,
                                        flex: 1
                                    }}
                                    selectedValue={CollectionPoint}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setCollectionPoint(itemValue)
                                    }>
                                    {CollectionPointData.map((collPoint, index) => {
                                        return (
                                            <Picker.Item key={index} label={collPoint} value={collPoint} />
                                        )
                                    })}
                                </Picker>

                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <Text style={{ width: '45%', fontSize: 14, fontWeight: 'bold', }}>ATBU Farm (Free)</Text>
                                <Text style={{ width: '45%', fontSize: 14, fontWeight: 'bold' }}>Delivery (N100)</Text>
                            </View>
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
                                onPress={() => onGotoHome()}
                            />

                        </ View>

                    </KeyboardAwareScrollView>
                </View >

            }



        </View >

    )
}
