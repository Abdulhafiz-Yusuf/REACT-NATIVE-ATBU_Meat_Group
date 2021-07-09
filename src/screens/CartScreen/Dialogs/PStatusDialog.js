import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

function PStatusDialog({ visible, onDismiss, onRemoveCart }) {

    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={onDismiss}>
                    <Dialog.Title>Payment Info</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={styles.contentHeader}>PAYMENT PENDING</Paragraph>
                        <Paragraph style={styles.contentInstruction}>You can use the bank details for your payment.</Paragraph>
                        <Paragraph style={styles.content}>Name Name: XYZ Ltd{'\n'}Account Name: XYZ ADB{'\n'}Account Number: 0123456789{'\n'}Sort Code: 12345</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button mode="contained" style={{ marginRight: 5 }} onPress={onRemoveCart}>Remove Order</Button>
                        <Button mode="contained" onPress={onDismiss}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>


    )
}

export default PStatusDialog

const styles = StyleSheet.create({
    actionBtn:
    {
        flex: 1,
        alignItems: 'space-between',
        borderWidth: 1
    },
    contentHeader: {
        backgroundColor: 'red',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    contentInstruction: {
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    content: {
        fontWeight: 'bold'
    },
})