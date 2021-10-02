import * as React from 'react';
// import { } from 'react-native';

import { Image, TouchableOpacity, View } from 'react-native';
import { Card, Button, BottomNavigation, Text } from 'react-native-paper';
import styles from './styles';
const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const UserMenu = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: 'music', title: 'Divisions',
            // icon: <Image
            //     style={styles.tinyLogo}
            //     source={require('../../../asset/head.jpeg')}
            // />
        },
        {
            key: 'music', title: 'Head',
            // icon: <Image
            //     style={styles.tinyLogo}
            //     source={require('../../../asset/head.jpeg')}
            // />
        },
        {
            key: 'albums', title: 'Legs',
            // icon: 'album'
        },
        {
            key: 'recents', title: 'Tail',
            // icon: 'history'
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        music: MusicRoute,
        albums: AlbumsRoute,
        recents: RecentsRoute,
    });

    return (
        <View style={styles.maincontainer}>

            <View style={styles.Menucontainer}>
                <TouchableOpacity
                    style={styles.btn}
                // onPress={onAddtoCartPress}
                >
                    <Text style={styles.buttonTitle}>Divisions</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                // onPress={onAddtoCartPress}
                >
                    <Text style={styles.buttonTitle}>Divisions</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                // onPress={onAddtoCartPress}
                >
                    <Text style={styles.buttonTitle}>Divisions</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                // onPress={onAddtoCartPress}
                >
                    <Text style={styles.buttonTitle}>Divisions</Text>
                </TouchableOpacity>

                {/* <BottomNavigation
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                    style={styles.menu}
                />*/}
            </View>
            <Card style={styles.orderingContainer}>Ordering</Card>
            <View style={styles.summary}>sdlfsdl</View>
        </View>

    );
};


export default UserMenu;

