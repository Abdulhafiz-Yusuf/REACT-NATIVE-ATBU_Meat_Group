import React, { useContext, useEffect } from 'react'
import { Text, View, Image } from 'react-native'
import { Avatar, List } from 'react-native-paper'
import styles from './styles';
import { } from '../../AppStore/actions/UserActions'
import { userStore } from '../../AppStore/UserStore';
import ListItem from '../../components/ListItem';

function ProfileScreen() {
    const { state, dispatch } = useContext(userStore)
    const user = state.user
    console.log(user)
    // const user = {
    //     dept: "DCCE",
    //     email: "yushaff@gmail.com",
    //     fullName: "Abdulhafiz Yusuf",
    //     id: "133BzGWDy8TqVWGrEJd0pEWQxSO2",
    //     phone: "08132652465",
    //     staffId: "2342"
    // }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                <Avatar.Image size={100} source={require('../../../asset/profileicon.png')} />
                <Text style={styles.userName}>{user.fullName}</Text>
            </View>



            <ListItem
                title={user.staffId}
                description={'Staff ID'}
                icon='folder'
            />

            <ListItem
                title={user.dept}
                description="Department"
                icon='folder'
            />

            <ListItem
                title={user.phone}
                description="Phone"
                icon="phone" />


            <List.Item
                title={user.email}
                description="Email"
                icon="email" />


        </View >
    )
}

export default ProfileScreen



