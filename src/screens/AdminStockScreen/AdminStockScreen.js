import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Button } from 'react-native'
import styles from './styles';

import { Picker } from '@react-native-picker/picker'
import LoadScreen from '../../components/LoadScreen';
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import { userStore } from '../../AppStore/UserStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import { addToCart, fetchAPIforOrderScreen, Logout } from '../../AppStore/actions/UserActions'
import { Card, TextInput } from 'react-native-paper'
import { stockCowAction, updateStock } from '../../AppStore/actions/UserActions';
import OrderCard from '../../components/OrderCard'

export default function AdminStockScreen(props) {

    const { state, dispatch } = useContext(userStore)
    let user = props.route.params.user
    const [tempStockQty, settempStockQty] = useState()

    const [ImageUrl, setImageUrl] = useState({
        divImage: require('../../../asset/beef.jpeg'),
        legImage: require('../../../asset/cowleg.jpeg'),
        tailImage: require('../../../asset/cowtail.jpeg'),
        headImage: require('../../../asset/head.jpeg')
    })

    const [newCowItem, setNewCowItem] = useState({
        ItemName: 'Division',
        itemQty: '',
        itemAmount: '',
        ItemImage: ''
    })

    // const [Quantity, setQuantity] = useState(1)
    // const [Month, setMonth] = useState('January')
    // const [CollectionPoint, setCollectionPoint] = useState('ATBU Farm')
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState()


    const onStockUpdatePress = (item, totalPrice, index) => {

        if (item.counter === 0) {

            alert('You can not update with zero value')
        }
        else {
            setLoading(true)
            updateStock(dispatch, item, tempStockQty, index, setLoading)
        }
    }
    const onStockCowPress = () => {
        setLoading(true)
        //const timestamp = Firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            itemid: nanoid(5),
            ItemName: newCowItem.ItemName,
            itemAmount: parseInt(newCowItem.itemAmount),
            itemQty: parseInt(newCowItem.itemQty),
            pstatus: 'available',
            counter: 0
            //  date: timestamp,
        };
        stockCowAction(dispatch, data, setLoading, setError, props)
    }

    const renderButton = () => {

        if (Loading) {
            return <LoadScreen size='small' text={'Stocking a Cow...'} />
        }

        if (!Loading) {
            return (
                //  <View style={styles.btncontainer} >
                //  <TouchableOpacity
                //         style={styles.btn}
                //         onPress={onStockCowPress}>
                //         <Text style={styles.buttonTitle}>Stock Cow</Text>
                //     </TouchableOpacity> 
                // </ View>
                <View style={styles.itemContainer}>
                    <Button
                        onPress={onStockCowPress}
                        title="Add New Stock Item"
                        color="#c53c3c"
                    />
                </View>


            )
        }

    }


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

                        <Card style={{ margin: 5, }}>
                            <View style={styles.PickerInput}>
                                <Text
                                    style={{ fontWeight: 'bold', fontSize: 14, flex: 1, color: 'blue', alignSelf: 'center', }}
                                >Choose Item Category </Text>
                                <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, backgroundColor: '#87CEEB' }}>
                                    <Picker
                                        style={{
                                            color: '#000',
                                            fontSize: 14,
                                            lineHeight: 23,
                                            flex: 1,

                                            // flex: 1
                                        }}
                                        selectedValue={newCowItem.ItemName}
                                        onValueChange={(itemValue, itemIndex) => {

                                            setNewCowItem({ newCowItem, ItemName: itemValue })
                                        }}>
                                        {['Division', 'Head', 'Tail', 'Leg'].map((quantity, index) => {
                                            return (
                                                <Picker.Item key={index} label={quantity} value={quantity} />
                                            )
                                        })}
                                    </Picker>
                                </View>

                            </View>

                            <TextInput
                                style={styles.input}
                                label={`Price per ${newCowItem.ItemName}`}
                                outlineColor="#blue"
                                onChangeText={(text) => setNewCowItem({ ...newCowItem, itemAmount: text })}
                                value={newCowItem.itemAmount}
                                mode="outlined"
                                keyboardType='numeric'
                            />

                            <TextInput
                                style={styles.input}
                                label={`Quantity`}
                                outlineColor="#blue"
                                onChangeText={(text) => setNewCowItem({ ...newCowItem, itemQty: text })}
                                value={newCowItem.itemQty}
                                mode="outlined"
                                keyboardType='numeric'
                            />

                            <Text style={styles.errorText}>
                                {error}
                            </Text>

                            {renderButton()}
                        </Card>



                        <View style={styles.userContainer}>
                            {/* <Text style={styles.userName}>COW ID: <span style={{ color: 'red' }}>{autooid}</span></Text> */}
                            <Text style={styles.userInstruction}> Please fill in all field below to stock a cow</Text>
                        </View>


                        {
                            !Loading &&
                            <OrderCard
                                btnActionHandler={(item, totalPrice, index) => onStockUpdatePress(item, totalPrice, index)}
                                page='admin'
                                setTempCounterValue={settempStockQty}
                            />
                        }
                    </KeyboardAwareScrollView>
                </View >

            }



        </View >

    )
}



