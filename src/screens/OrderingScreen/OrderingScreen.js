import React, { useState, useEffect, useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { Icon, normalize, withBadge } from 'react-native-elements'
import { QuantityData, MonthData, CollectionPointData, } from './Data'
import { Picker } from '@react-native-picker/picker'
import LoadScreen from '../../components/LoadScreen';
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import { userStore } from '../../AppStore/UserStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { addToCart, fetchAPIforOrderScreen } from '../../AppStore/actions/UserActions'


export default function OrderingScreen(props) {

    const { state, dispatch } = useContext(userStore)
    const user = state.user
    console.log(state)
    // const user = {
    //     email: "yushaf01@gmail.com",
    //     fullName: "Abdulhafiz Yusuf",
    //     id: "dobTvCESHOTYQHZIeQfgh7lQVyi1"
    // }
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
            cost: Math.round((Quantity * cost)),
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
        <View style={{ flex: 1 }}>

            {
                !cost || totalInCart === null ?
                    <LoadScreen />
                    :
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


                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Quantity</Text>
                                    <View style={{ flex: 2, flexDirection: 'row' }}>
                                        <Picker
                                            placeholder='Quantity'
                                            mode='dropdown'

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
                                        <Text style={styles.labelKG}>KG</Text>
                                    </View>

                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Month</Text>
                                    <Picker
                                        style={styles.input}
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
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Collection Point</Text>

                                    <View style={{ flex: 2 }}>
                                        <Picker
                                            style={styles.input}
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
                                        <Text style={styles.labelKG}>ATBU Farm (Free)</Text>
                                        <Text style={styles.labelKG}>Delivery (N100)</Text>
                                    </View>
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
