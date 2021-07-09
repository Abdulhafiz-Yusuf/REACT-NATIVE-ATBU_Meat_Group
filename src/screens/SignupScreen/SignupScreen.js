import React, { useState, useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { singUp } from '../../AppStore/actions/UserActions'
import LoadScreen from '../../components/LoadScreen'
import { TextInput } from 'react-native-paper'
import { userStore } from '../../AppStore/UserStore';


export default function RegistrationScreen({ navigation }) {

    const { state, dispatch } = useContext(userStore)

    const [fullName, setFullName] = useState('')
    const [staffId, setstaffId] = useState('')
    const [dept, setdept] = useState('')
    const [phone, setphone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    //  const { state, dispatch } = useContext(userStore);


    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            setError("Passwords don't match.")
            return
        }
        else if (fullName === '' || email === '' || staffId === '' || dept === '' || phone === '' || password === '' || confirmPassword === '') {
            setError('All field must be filled!')
        }
        else {
            setLoading(true)
            singUp(dispatch, fullName, email, password, staffId, dept, phone, navigation, setError, setLoading)
        }
    }

    const renderButton = () => {
        if (Loading) {
            return <LoadScreen size='large' text='Signing up....' />
        }
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => onRegisterPress()}>
                <Text style={styles.buttonTitle}>Register</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../asset/logo.jpg')}
                />

                <TextInput
                    style={styles.input}
                    label='Full Name'
                    mode='outlined'
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    mode="outlined"
                />

                <TextInput
                    style={styles.input}
                    label='Staff ID'
                    outlineColor="#blue"
                    onChangeText={(text) => setstaffId(text)}
                    value={staffId}
                    mode="outlined"
                />


                <TextInput
                    style={styles.input}
                    label='Department'
                    outlineColor="#blue"
                    onChangeText={(text) => setdept(text)}
                    value={dept}
                    mode="outlined"
                />


                <TextInput
                    style={styles.input}
                    label='Phone Number'
                    outlineColor="#blue"
                    onChangeText={(text) => setphone(text)}
                    value={phone}
                    mode="outlined"
                />

                <TextInput
                    style={styles.input}
                    label='E-mail'
                    outlineColor="#blue"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    mode="outlined"
                />
                <TextInput
                    style={styles.input}
                    outlineColor="#blue"
                    secureTextEntry
                    label='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    mode="outlined"
                />
                <TextInput
                    style={styles.input}
                    outlineColor="#blue"
                    secureTextEntry
                    label='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    mode="outlined"
                />


                <Text style={styles.errorText}>
                    {error}
                </Text>
                {renderButton()}


                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
