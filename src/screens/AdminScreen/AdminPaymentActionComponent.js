import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import styles from './styles'


function PaymentActionComponent({ paymentStatus, showPApprovalDialog, showDisapproveDialog }) {

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
                            style={styles.DisapproveIconContainer}
                            onPress={showDisapproveDialog}
                        >
                            <Text style={styles.DisapproveIconText}>Disapprove</Text>

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
                            onPress={showPApprovalDialog}
                        >
                            <Text style={styles.IconText}>Approve</Text>
                        </TouchableOpacity>
                    </View>
            }

        </View >
    )
}

export default PaymentActionComponent
