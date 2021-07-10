import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';



function CollectionSchedule({ visible, onDismiss }) {
    return (

        <View>
            <View>
                <Portal>
                    <Dialog visible={visible} onDismiss={onDismiss}>
                        <Dialog.Title>Collection Info</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph style={styles.contentHeader}>COLLECTION SCHEDULE</Paragraph>
                            <Paragraph style={styles.contentInstruction}>Your collection schedule is as follows:.</Paragraph>
                            <Paragraph style={styles.content}>
                                Collection Point: ATBU Farm{'\n'}
                                Date: dd-mm-yyyy{'\n'}
                                Time: hh:mm{'\n'}
                            </Paragraph>
                        </Dialog.Content>


                        <Dialog.Actions>
                            <Button mode="contained" onPress={onDismiss}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

            </View>
        </View>
    )
}

export default CollectionSchedule


const styles = StyleSheet.create({
    actionBtn:
    {
        flex: 1,
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