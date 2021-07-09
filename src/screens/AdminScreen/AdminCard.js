import * as React from 'react';
import { Avatar, List, Card, Divider } from 'react-native-paper';
import { View, Text } from "react-native";
import styles from './styles'
import { DisapprovalDialog, ApprovalDialog, } from './Dialogs';

import PaymentActionComponent from './AdminPaymentActionComponent';

const CardComponent = ({ data, index }) => {
    const [DisapprovalVisible, setDisapprovalVisible] = React.useState(false);
    const [paymentApprovalVisible, setpaymentApprovalVisible] = React.useState(false);

    const showDisapproveDialog = () => setDisapprovalVisible(true);
    const showPApprovalDialog = () => setpaymentApprovalVisible(true);

    const onDisappDismiss = () => setDisapprovalVisible(false)
    const onApprovalDismiss = () => setpaymentApprovalVisible(false)

    let qty = data.qty + ' KG'

    return (
        <View style={{ padding: 3 }}>
            <ApprovalDialog visible={paymentApprovalVisible} onDismiss={onApprovalDismiss} index={index} data={data} />
            <DisapprovalDialog visible={DisapprovalVisible} onDismiss={onDisappDismiss} index={index} data={data} />
            <Card >
                <View style={{ flexDirection: 'row', paddingRight: 10, }} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar.Image style={{ margin: 10 }} size={50} source={require('../../../asset/beef.jpeg')} />
                        <Text style={styles.price}>NGN{data.cost}</Text>
                    </View>


                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ alignContent: 'center' }}>
                            <List.Item
                                style={styles.listItem}
                                title={data.oid}
                                description='Order ID'
                            />
                            <List.Item
                                style={styles.listItem}
                                title={qty}
                                description='Quanity'
                            />


                            <List.Item
                                style={styles.listItem}
                                title={data.cpoint}
                                description='Collection Point'
                            />
                        </View>
                    </View>

                    <View style={{ justifyContent: 'space-around', alignContent: 'center' }}>
                        <PaymentActionComponent paymentStatus={data.pstatus} showPApprovalDialog={showPApprovalDialog} showDisapproveDialog={showDisapproveDialog} />
                    </View>
                </View>
            </Card >

            <Divider />
        </View>


    )
};

export default CardComponent;



