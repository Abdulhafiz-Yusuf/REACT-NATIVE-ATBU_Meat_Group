import React, { useState } from 'react';
import { View, Text, Image, Button, Dimensions, StyleSheet } from 'react-native';
import { AlignJustify } from 'react-native-feather';

// import Config from 'react-native-config';

import { SimpleStepper } from 'react-native-simple-stepper';
const screenWidth = Dimensions.get('window').width;

// const BASE_URL = Config.NGROK_HTTPS_URL;

const PageCard = ({ addToBasket, page }) => {
    // const { id, image, price } = item;
    const [showTotalPrice, setShowTotalPrice] = useState({
        show: false,
        totalPrice: 0,
    })



    const [qtyValue, setqtyValue] = useState([])
    const [Items, setItems] = useState([
        { name: 'COW DIVISION', image: require(`../../../asset/beef.jpeg`), price: '2000', inStock: '20', qty: 0 },
        { name: 'COW HEAD', image: require(`../../../asset/head.jpeg`), price: '1500', inStock: '20', qty: 0 },
        { name: 'COW TAIL', image: require(`../../../asset/cowtail.jpeg`), price: '300', inStock: '20', qty: 0 },
        { name: 'COW LEG', image: require(`../../../asset/cowleg.jpeg`), price: '6000', inStock: '20', qty: 0 },
    ]
    )
    const addToCart = (item, index) => {
        const totalPrice = Math.round(parseInt(item.price) * item.qty)
        console.log('totalprice: ' + totalPrice)
        addToBasket(item, totalPrice)
    }

    const qtyChanged = (value, index,) => {
        let tempData = Items
        tempData[index].qty = value
        console.log(tempData)
        setItems(tempData)


    }

    // page !== 'admin' ?
    return (
        < View style={styles.BigWrapper} >
            {
                Items.length !== 0 &&
                Items.map((item, index) => {

                    return (
                        <View style={styles.wrapper}>
                            <Image
                                style={styles.image}
                                // source={require('../../../asset/beef.jpeg')}
                                source={item.image}
                            // source={{ uri: `../../../asset/${logo}` }}
                            />


                            <View style={styles.smallItemContainer}>
                                <Text style={styles.mainText}>{item.name}</Text>
                            </View>
                            <View style={styles.smallItemContainer}>
                                <Text style={styles.redlabelText}> 599</Text>
                                <Text style={styles.labelText}> available</Text>
                            </View>

                            <View style={styles.smallItemContainer}>
                                <Text style={styles.priceText}>NGN{item.price}</Text>
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
        </View >
        // :
        // <View style={styles.BigWrapper}>
        //     {
        //         Items.length !== 0 &&
        //         Items.map((item, index) => {

        //             return (
        //                 <View style={styles.wrapper}>
        //                     <Image
        //                         style={styles.image}
        //                         // source={require('../../../asset/beef.jpeg')}
        //                         source={item.image}
        //                     // source={{ uri: `../../../asset/${logo}` }}
        //                     />


        //                     <View style={styles.smallItemContainer}>
        //                         <Text style={styles.mainText}>{item.name}</Text>
        //                     </View>
        //                     <View style={styles.smallItemContainer}>
        //                         <Text style={styles.redlabelText}> 599</Text>
        //                         <Text style={styles.labelText}> available</Text>
        //                     </View>

        //                     <View style={styles.smallItemContainer}>
        //                         <Text style={styles.priceText}>NGN{item.price}</Text>
        //                         <Text style={styles.redlabelText}> per 1</Text>
        //                     </View>


        //                     <View style={styles.smallItemContainer}>
        //                         <Text style={styles.labelText}>How many?</Text>
        //                     </View>

        //                     <View style={styles.itemContainer}>
        //                         <SimpleStepper
        //                             valueChanged={value => qtyChanged(value, index)}
        //                             initialValue={0}
        //                             minimumValue={0}
        //                             maximumValue={20}
        //                             showText={true}
        //                             containerStyle={styles.stepperContainer}
        //                             incrementImageStyle={styles.stepperButton}
        //                             decrementImageStyle={styles.stepperButton}
        //                             textStyle={styles.stepperText}
        //                         />
        //                     </View>
        //                     {/* {
        //                         showTotalPrice.show ?
        //                             <View style={styles.smallItemContainer}>
        //                                 <Text style={styles.redlabelText}> TOTAL</Text>
        //                                 <Text style={styles.priceText}>NGN {Math.round(parseInt(item.price) * item.qty)}</Text>
        //                             </View>
        //                             :
        //                             <View></View>
        //                     } */}
        //                     <View style={styles.itemContainer}>
        //                         <Button
        //                             onPress={() => {
        //                                 addToCart(item, index);
        //                             }}
        //                             title="Add to Basket"
        //                             color="#c53c3c"
        //                         />
        //                     </View>
        //                 </View>
        //             )
        //         })
        //     }
        // </View>
    )
};

const styles = StyleSheet.create({
    BigWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderWidth: 1,
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    wrapper: {
        // flex: 1,
        alignItems: 'center',
        width: 150,
        borderWidth: 1
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