import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { Avatar, List } from 'react-native-paper'
import styles from './styles';
import { userStore } from '../../AppStore/UserStore';

function ProfileScreen() {
    const { state } = useContext(userStore)
    const user = state.user
    // console.log(user) ===
    //{
    // dept: "DCCE"
    // email: "yushaff@gmail.com"
    // fullName: "Abdulhafiz Yusuf"
    // id: "133BzGWDy8TqVWGrEJd0pEWQxSO2"
    // phone: "08132652465"
    // staffId: "2342"
    //}

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center', margin: 3 }}>
                <Avatar.Image size={100} source={require('../../../asset/profileicon.png')} />
                <Text style={styles.userName}>{user.fullName}</Text>
            </View>

            <List.Item
                title={user.staffId}
                description="Staff ID"
                left={props => <List.Icon {...props} icon="folder" />}
            />

            <List.Item
                title={user.dept}
                description="Department"
                left={props => <List.Icon {...props} icon="home" />}
            />

            <List.Item
                title={user.phone}
                description="Phone"
                left={props => <List.Icon {...props} icon="phone" />}
            />

            <List.Item
                title={user.email}
                description="Email"
                left={props => <List.Icon {...props} icon="email" />}
            />


        </View>
    )
}

export default ProfileScreen



