import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, withBadge } from 'react-native-elements'





export default function Header({ title }) {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>ATBU Meat Group</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
        left: 16
    }


})