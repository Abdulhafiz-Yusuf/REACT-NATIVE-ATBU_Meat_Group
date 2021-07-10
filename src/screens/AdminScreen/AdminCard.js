import * as React from 'react';
import { Avatar, Card, Divider } from 'react-native-paper';
import { View, Text } from "react-native";
import styles from './styles'
import { DisapprovalDialog, ApprovalDialog, } from './Dialogs';
import ListItem from '../../components/ListItem';
import PaymentActionComponent from './AdminPaymentActionComponent';

export default function AdminCard({ data, index }) {
    const [DisapprovalVisible, setDisapprovalVisible] = React.useState(false);
    const [paymentApprovalVisible, setpaymentApprovalVisible] = React.useState(false);

    const showDisapproveDialog = () => setDisapprovalVisible(true);
    const showPApprovalDialog = () => setpaymentApprovalVisible(true);

    const onDisappDismiss = () => setDisapprovalVisible(false)
    const onApprovalDismiss = () => setpaymentApprovalVisible(false)

    let qty = data.qty + ' KG'

    return (
        <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 5, flex: 1 }}>
            <ApprovalDialog visible={paymentApprovalVisible} onDismiss={onApprovalDismiss} index={index} data={data} />
            <DisapprovalDialog visible={DisapprovalVisible} onDismiss={onDisappDismiss} index={index} data={data} />

            <Card style={{ margin: 0 }} >
                <View style={{ flexDirection: 'row', paddingRight: 10, }} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar.Image style={{ margin: 5 }} size={120} source={require('../../../asset/beef.jpeg')} />
                        <Text style={styles.price}>NGN{data.cost}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ alignContent: 'center' }}>
                            <ListItem
                                style={styles.listItem}
                                title={data.oid}
                                description='Order ID'
                            />
                            <ListItem
                                style={styles.listItem}
                                title={qty}
                                description='Quanity'
                            />


                            <ListItem
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





