import React, { useContext, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { login } from '../../AppStore/actions/UserActions'
import LoadScreen from '../../components/LoadScreen';
import { userStore } from '../../AppStore/UserStore';

export default function LoginScreen({ navigation }) {
    const { state, dispatch } = useContext(userStore)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Signup')
    }

    const onLoginPress = () => {
        if (email === '' || password === '') {
            setError('All fields must be filled!')
        }
        else {
            setLoading(true)
            setError('')
            //login() from ContextAPI Action
            login(dispatch, email, password, setError, setLoading, navigation)
        }
    }

    const renderButton = () => {
        if (Loading) {
            return (<LoadScreen size='small' text='Loging in....' />)
        }
        else {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
            )
        }
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
                <Text style={styles.errorText}>
                    {error}
                </Text>
                <View>
                    {renderButton()}
                </View>

                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
} 