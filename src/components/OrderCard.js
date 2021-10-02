import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Button, Dimensions, StyleSheet } from 'react-native';
import { AlignJustify } from 'react-native-feather';

// import Config from 'react-native-config';

import { SimpleStepper } from 'react-native-simple-stepper';
import { fetchStock } from '../AppStore/actions/UserActions';
import { userStore } from '../AppStore/UserStore';
const screenWidth = Dimensions.get('window').width;

// const BASE_URL = Config.NGROK_HTTPS_URL;

const PageCard = ({ props, btnActionHandler, page, setTempCounterValue, AllinStock }) => {

    const { state, dispatch } = useContext(userStore)

    // const { id, image, price } = item;
    const [showTotalPrice, setShowTotalPrice] = useState({
        show: false,
        totalPrice: 0,
    })
    const [qtyValue, setqtyValue] = useState([])
    const [StockItem, setStockItem] = useState([])


    useEffect(() => {

        fetchStock(dispatch, setStockItem)
    }, [])





    const addToCart = (item, index) => {
        const totalPrice = Math.round(parseInt(item.itemAmount) * item.itemQty)
        console.log('totalprice: ' + totalPrice)
        btnActionHandler(item, totalPrice, index)
    }

    const qtyChanged = (value, index,) => {
        let tempData = StockItem
        tempData[index].counter = value
        setTempCounterValue(tempData)



    }

    if (page === 'admin') {
        return (
            <View style={styles.BigWrapper}>
                {
                    StockItem.length !== 0 &&
                    StockItem.map((item, index) => {

                        return (
                            <View style={styles.wrapper}>
                                {/* <Avatar.Image style={{ margin: 5 }} size={120} source={item.ItemImage} /> */}
                                <Image
                                    style={styles.image}
                                    source={item.ItemName === 'Division' ? require('../../asset/beef.jpeg') :
                                        item.ItemName === 'Head' ? require('../../asset/head.jpeg') :
                                            item.ItemName === 'Tail' ? require('../../asset/cowtail.jpeg') :
                                                item.ItemName === 'Leg' && require('../../asset/cowleg.jpeg')


                                    }
                                // source={item.ItemImage}
                                // source={{ uri: `../../../asset/${logo}` }}
                                />

                                {/*

                                ItemImage: "/static/media/beef.898ad7ea.jpeg"
                                ItemName: "Division"
                                itemAmount: 5000
                                itemQty: 21
                                itemid: "0cYBx"
                                pstatus: "available" 
                            
                            */}

                                <View style={styles.smallItemContainer}>
                                    <Text style={styles.mainText}>{item.ItemName}</Text>
                                </View>
                                <View style={styles.smallItemContainer}>
                                    <Text style={styles.redlabelText}> {item.itemQty}</Text>
                                    <Text style={styles.labelText}> available</Text>
                                </View>

                                <View style={styles.smallItemContainer}>
                                    <Text style={styles.priceText}>NGN{item.itemAmount}</Text>
                                    <Text style={styles.redlabelText}> per 1</Text>
                                </View>


                                <View style={styles.smallItemContainer}>
                                    <Text style={styles.labelText}>Increase by?</Text>
                                </View>

                                <View style={styles.itemContainer}>
                                    <SimpleStepper
                                        valueChanged={value => qtyChanged(value, index)}
                                        initialValue={0}
                                        minimumValue={-20}
                                        maximumValue={20}
                                        showText={true}
                                        containerStyle={styles.stepperContainer}
                                        incrementImageStyle={styles.stepperButton}
                                        decrementImageStyle={styles.stepperButton}
                                        textStyle={styles.stepperText}
                                    />
                                </View>
                                {/* {
                                showTotalPrice.show ?
                                    <View style={styles.smallItemContainer}>
                                        <Text style={styles.redlabelText}> TOTAL</Text>
                                        <Text style={styles.priceText}>NGN {Math.round(parseInt(item.price) * item.qty)}</Text>
                                    </View>
                                    :
                                    <View></View>
                            } */}
                                <View style={styles.itemContainer}>
                                    <Button
                                        onPress={() => {
                                            addToCart(item, index);
                                        }}
                                        title="Update Stock"
                                        color="#c53c3c"
                                    />
                                </View>
                            </View>
                        )
                    })
                }
            </View>

        )
    }
    if (page !== 'admin') {
        return (
            <View style={styles.BigWrapper}>
                {
                    AllinStock.length !== 0 &&
                    AllinStock.map((item, index) => {
                        return (
                            <View style={styles.wrapper}>

                                <Image
                                    style={styles.image}
                                    source={item.ItemName === 'Division' ? require('../../asset/beef.jpeg') :
                                        item.ItemName === 'Head' ? require('../../asset/head.jpeg') :
                                            item.ItemName === 'Tail' ? require('../../asset/cowtail.jpeg') :
                                                item.ItemName === 'Leg' && require('../../asset/cowleg.jpeg')


                                    }
                                // source={item.ItemImage}
                                // source={{ uri: `../../../asset/${logo}` }}
                                />

                                <View style={styles.smallItemContainer}>
                                    <Text style={styles.mainText}>{item.ItemName}</Text>
                                </View>
                                <View style={styles.smallItemContainer}>
                                    <Text style={styles.redlabelText}> {item.itemQty}</Text>
                                    <Text style={styles.labelText}> available</Text>
                                </View>

                                <View style={styles.smallItemContainer}>
                                    <Text style={styles.priceText}>NGN{item.itemAmount}</Text>
                                    <Text style={styles.redlabelText}> per 1</Text>
                                </View>


                                <View style={styles.smallItemContainer}>
                                    <Text style={styles.labelText}>How many?</Text>
                                </View>

                                <View style={styles.itemContainer}>
                                    <SimpleStepper
                                        valueChanged={value => qtyChanged(value, index)}
                                        initialValue={0}
                                        minimumValue={0}
                                        maximumValue={20}
                                        showText={true}
                                        containerStyle={styles.stepperContainer}
                                        incrementImageStyle={styles.stepperButton}
                                        decrementImageStyle={styles.stepperButton}
                                        textStyle={styles.stepperText}
                                    />
                                </View>
                                {/* {
                                showTotalPrice.show ?
                                    <View style={styles.smallItemContainer}>
                                        <Text style={styles.redlabelText}> TOTAL</Text>
                                        <Text style={styles.priceText}>NGN {Math.round(parseInt(item.price) * item.qty)}</Text>
                                    </View>
                                    :
                                    <View></View>
                            } */}
                                <View style={styles.itemContainer}>
                                    <Button
                                        onPress={() => {
                                            addToCart(item, index);
                                        }}
                                        title="Add to Basket"
                                        color="#c53c3c"
                                    />
                                </View>
                            </View>
                        )
                    })
                }
            </View>

        )
    }

};

const styles = StyleSheet.create({
    BigWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingLeft: 10,
        justifyContent: 'flex-start',
        marginTop: 10
    },
    wrapper: {
        borderRadius: 5,
        alignItems: 'center',
        width: 150,
        borderWidth: 1,
        margin: 10
    },
    image: {
        // width: screenWidth - 20,
        height: 90,
        width: 100,
        marginBottom: 5,
        borderRadius: 100
    },
    stepperContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        borderColor: '#ccc',
    },
    itemContainer: {
        marginBottom: 10,
    },
    smallItemContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue'

    },
    subText: {
        fontSize: 14,
        color: '#3a3a3a',
    },
    priceText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#c53c3c'
    },
    labelText: {
        fontSize: 18,
        color: '#303540',
        fontWeight: 'bold'
    },
    redlabelText: {
        fontSize: 18,
        color: '#c53c3c',

    },
    stepperButton: {
        height: 20,
        width: 20,
    },
    stepperText: {
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },

});

export default PageCard;