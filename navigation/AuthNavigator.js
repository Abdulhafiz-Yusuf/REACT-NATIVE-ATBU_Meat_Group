import React, { useState, useEffect, createContext, useContext } from 'react'
// import auth from '@react-native-firebase/auth'
import DrawerNavigation from './DrawerNavigator'
import { MainStack } from './MainStackNavigator'
import Firebase, { db } from '../src/firebase/FirebaseConfig'
import { userStore } from '../src/AppStore/UserStore'
import { set } from 'react-native-reanimated'
import LoadScreen from '../src/components/LoadScreen'

export const AuthContext = createContext(null)


export default function AuthNavigator() {

    const { state, dispatch } = useContext(userStore)

    const [initializing, setInitializing] = useState(true)
    // const [user, setUser] = useState(null)
    const user = state.user
    // Handle user state changes
    function onAuthStateChanged(result) {
        if (result) {
            const uid = result.uid
            const usersRef = db.collection('users')
            usersRef.doc(uid).get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        setError("User does not exist.Please Signup below")
                        setLoading(false)
                        return;
                    }
                    setInitializing(false)
                    const user = firestoreDocument.data()

                    dispatch({
                        type: 'GET_CURRENT_USER',
                        payload: user
                    })
                })
        }
        else {
            setInitializing(false)
        }

    }

    useEffect(() => {
        const authSubscriber = Firebase.auth().onAuthStateChanged(onAuthStateChanged)
        // unsubscribe on unmount
        return authSubscriber
    }, [])

    if (initializing) {
        return <LoadScreen />
    }


    return user ? (
        <DrawerNavigation user={user} />
    ) : (
        <MainStack />
    )
}