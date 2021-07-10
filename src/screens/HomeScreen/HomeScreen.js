import React from 'react'
//import { Button } from 'react-native-elements';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';


function HomeScreen({ navigation }) {

    const onRegisterPress = () => {
        navigation.navigate('Signup')
    }
    const onLoginPress = () => {
        navigation.navigate('Login')
    }
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../../asset/logo.jpg')}
            />
            <View style={styles.btncontainer} >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Register</Text>
                </TouchableOpacity>

            </ View>

        </View>

    )
}

export default HomeScreen
