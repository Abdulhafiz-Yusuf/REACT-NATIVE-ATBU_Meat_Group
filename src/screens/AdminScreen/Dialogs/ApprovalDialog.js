import React, { useState, useContext } from 'react'
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { db } from '../../../firebase/FirebaseConfig'
import { userStore } from '../../../AppStore/UserStore'
import { fectchAllOrderData } from '../../../AppStore/actions/UserActions'

function ApprovalDialog({ visible, onDismiss, data }) {
    const { state, dispatch } = useContext(userStore)

    const orderDataRef = db.collection('order')

    const onPaymentApproval = () => {
        // Set the "capital" field of the city 'DC'
        orderDataRef.where('oid', '==', data.oid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    return db.collection('order').doc(doc.id)
                        .update({
                            pstatus: 'paid'
                        })
                        .then(() => {
                            alert("Successfully updated!");
                            fectchAllOrderData(dispatch)
                            onDismiss()
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            alert("Error updating Item");
                        });

                })
            })
            .catch((error) => {
                alert("Error occur, ensure your internet connection is ON");
            });
    }




    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={onDismiss}>
                    <Dialog.Title>PAYMENT APPROVEMENT</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to approve this order's payment.
                             This will change the payment status of this item to PAID.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onPaymentApproval}>Yes</Button>
                        <Button onPress={onDismiss}>No</Button>
                    </Dialog.Actions>
                </Dialog>

            </Portal>
        </View>


    )
}

export default ApprovalDialog
