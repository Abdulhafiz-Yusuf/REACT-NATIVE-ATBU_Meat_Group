import * as React from 'react';
import { Avatar, List, Card, Divider } from 'react-native-paper';
import { View, Text } from "react-native";
import styles from './styles'
import { PaymentDialog, ScheduleDialog, RCartDialog, } from './Dialogs';

import PaymentActionComponent from './PaymentActionComponent';
import ListItem from '../../components/ListItem';

const CardComponent = ({ data, index, navigation }) => {
    console.log(data)
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
        <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 5, flex: 1 }}>
            <ScheduleDialog visible={scheduleDialogVisible} onDismiss={hideScheduleDialog} index={index} data={data} />
            <PaymentDialog visible={pStatusvisible} onDismiss={pStatushideDialog} index={index} data={data} onRemoveCart={onRemoveCart} />
            <RCartDialog navigation={navigation} visible={rCartvisible} onDismiss={hideBothPayandrCartDialog} index={index} data={data} onRemoveCart={onRemoveCart} />


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
                        <PaymentActionComponent paymentStatus={data.pstatus} showrCartDialog={showrCartDialog} showpStatusDialog={showpStatusDialog} showScheduleDialog={showScheduleDialog} />
                    </View>
                </View>
            </Card >
        </View>


    )
};

export default CardComponent;



