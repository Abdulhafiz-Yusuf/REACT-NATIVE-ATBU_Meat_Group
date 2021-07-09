import React, { useState, useContext } from 'react'
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { db } from '../../../firebase/FirebaseConfig'
import { userStore } from '../../../AppStore/UserStore'
import { fectchCurrentUserOrderData } from '../../../AppStore/actions/UserActions'

function RCartDialog({ visible, onDismiss, data, navigation }) {


    const { state, dispatch } = useContext(userStore)

    const orderDataRef = db.collection('order');
    const user = state.user
    const removeOrder = () => {
        orderDataRef.where('oid', '==', data.oid)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    // tempDataHolder = tempDataHolder.concat(doc.data())
                    db.collection('order').doc(doc.id).delete().then(() => {
                        console.log("Order successfully removed!");
                        alert('Remove successfully')
                        onDismiss()
                        // dispatch({
                        //     type: 'REFRESH',
                        //     payload: true
                        // })


                        fectchCurrentUserOrderData(dispatch, user, navigation)



                    }).catch((error) => {
                        console.error("Error removing order: ", error);
                    });

                });
            }).catch(err =>
                console.log(err)
            )
    }


    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={onDismiss}>
                    <Dialog.Title>Cancel Order</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to cancel this order. This will remove this item from your order list</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={removeOrder}>Yes</Button>
                        <Button onPress={onDismiss}>No</Button>
                    </Dialog.Actions>
                </Dialog>

            </Portal>
        </View>


    )
}

export default RCartDialog
