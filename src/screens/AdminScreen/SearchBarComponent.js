import * as React from 'react';
import { Button, IconButton, RadioButton, Searchbar, } from 'react-native-paper';
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";


const SearchBarComponent = ({ onSearchPress, searchText, radioValue, setSearchText, setRadioValue, loading }) => {

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
            <View>
                <Searchbar
                    placeholder="Search by order ID"
                    onChangeText={onChangeSearch}
                    value={searchText}
                />
            </View>

            <RadioButton.Group onValueChange={newValue => {
                setRadioValue(newValue)


            }
            } value={radioValue}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <RadioButton value="pending" />
                        <Text>Pending  Order</Text>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
        marginTop: 10,
        height: 140,
        justifyContent: 'flex-start',
        paddingRight: 10,
        paddingLeft: 10,
    },
    SearchButton: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    radioContainer: {

    },
    radioStyle: {

    }

});