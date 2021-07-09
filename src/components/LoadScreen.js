import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native';

function LoadScreen({ size, text }) {
    return (
        <View style={styles.SpinnerStyle}>
            <Text style={{ fontWeight: 'bold', }}> {text ? text : 'Loading ....'}</Text>
            <ActivityIndicator color='blue' size={size || "large"} />
        </View>
    );
};
const styles = {
    SpinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default LoadScreen;
