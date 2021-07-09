import * as React from 'react';
import { Avatar, List, Card, Divider } from 'react-native-paper';
import { View, Text } from "react-native";
import styles from './styles'
import { PaymentDialog, ScheduleDialog, RCartDialog, } from './Dialogs';

import PaymentActionComponent from './PaymentActionComponent';

const CardComponent = ({ data, index, navigation }) => {

    const [pStatusvisible, setpStatusvisible] = React.useState(false);
    const showpStatusDialog = () => setpStatusvisible(true);
    const pStatushideDialog = () => setpStatusvisible(false);

    const onRemoveCart = () => {
        showrCartDialog()
    }

    const [rCartvisible, setrCartvisible] = React.useState(false);
    const showrCartDialog = () => setrCartvisible(true);
    const hideBothPayandrCartDialog = () => {
        setrCartvisible(false);
        setpStatusvisible(false)
    }


    const [scheduleDialogVisible, setSchedDialogVisible] = React.useState(false);
    const showScheduleDialog = () => setSchedDialogVisible(true);
    const hideScheduleDialog = () => setSchedDialogVisible(false);
    let qty = data.qty + ' KG'

    return (
        <View style={{ padding: 3 }}>
            <ScheduleDialog visible={scheduleDialogVisible} onDismiss={hideScheduleDialog} index={index} data={data} />
            <PaymentDialog visible={pStatusvisible} onDismiss={pStatushideDialog} index={index} data={data} onRemoveCart={onRemoveCart} />
            <RCartDialog navigation={navigation} visible={rCartvisible} onDismiss={hideBothPayandrCartDialog} index={index} data={data} onRemoveCart={onRemoveCart} />
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
                        <PaymentActionComponent paymentStatus={data.pstatus} showrCartDialog={showrCartDialog} showpStatusDialog={showpStatusDialog} showScheduleDialog={showScheduleDialog} />
                    </View>




                </View>
            </Card >

            <Divider />
        </View>


    )
};

export default CardComponent;



