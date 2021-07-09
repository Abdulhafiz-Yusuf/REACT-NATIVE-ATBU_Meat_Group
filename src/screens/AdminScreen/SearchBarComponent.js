import * as React from 'react';
import { Button, IconButton, RadioButton, Searchbar, } from 'react-native-paper';
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";


const SearchBarComponent = ({ onSearchPress, searchText, radioValue, setSearchText, setRadioValue, loading }) => {

    // var sites = {
    //     links: [
    //         { href: "ibro" },
    //         { href: "habib" },
    //         { href: 'https://www.example.com/v1/contact-us/us' },
    //         { href: 'https://www.example.com/v1/dontcontact-us/us' }
    //     ]
    // };
    // const regex = new RegExp(`/${searchQuery}/b`, 'g');
    // const matchedSites = sites.links.filter(({ href }) => href.match(regex));
    //setMatchedWidowData(matchedArray)

    // const [Loading, setLoading] = React.useState(loading)

    const onChangeSearch = query => {
        setSearchText(query)
        console.log(searchText)
    }
    const renderButton = () => {
        if (loading) {
            return <ActivityIndicator color='blue' size='small' />

        }
        return (
            <Button
                color='blue'
                style={styles.SearchButton}
                mode="contained"
                onPress={onSearchPress}>
                Search
            </Button>
        )
    }
    return (
        <View style={styles.SearchBarContainer}>
            <Searchbar
                placeholder="Search by order ID"
                onChangeText={onChangeSearch}
                value={searchText}
            />

            <RadioButton.Group
                onValueChange={newValue => setRadioValue(newValue)}
                value={radioValue}
            >
                <View style={styles.radioContainer}>
                    <View style={styles.radioStyle}>
                        <RadioButton value="pending" />
                        <Text>Pending Order</Text>
                    </View>
                    <View style={styles.radioStyle}>
                        <RadioButton value="paid" />
                        <Text>Paid Order</Text>
                    </View>
                </View>
            </RadioButton.Group>



            {renderButton()}


        </View>
    );
};

export default SearchBarComponent;


const styles = StyleSheet.create({
    SearchBarContainer: {
        margin: 4,
    },
    SearchButton: {
        flex: 1,
        margin: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    radioContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    radioStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }

});