import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { IconButton } from 'react-native-paper'


import styles from './styles'


function PaymentActionComponent({ paymentStatus, showpStatusDialog, showScheduleDialog }) {


    return (
        <View>
            {
                paymentStatus === 'paid' ?
                    <View style={styles.paymentStatusContainer}>
                        <Image
                            style={styles.paymentStatusImage}
                            source={require('../../../asset/paid.jpg')}
                        />
                        <TouchableOpacity
                            style={styles.IconContainer}
                            onPress={showScheduleDialog}
                        >
                            <Text style={styles.IconText}>Collection{'\n'}Schedule</Text>

                        </TouchableOpacity>
                    </View>

                    :
                    <View style={styles.PayNowIconContainer}>
                        <Image
                            style={styles.paymentStatusImage}
                            source={require('../../../asset/pending.jpg')}
                        />
                        <TouchableOpacity
                            style={styles.IconContainer}
                            onPress={showpStatusDialog}
                        >
                            {/* <IconButton
                                icon="cash-multiple"
                                color='green'
                                size={15}
                                style={styles.Icon}
                            /> */}
                            <Text style={styles.IconText}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>

            }

        </View >
    )
}

export default PaymentActionComponent
