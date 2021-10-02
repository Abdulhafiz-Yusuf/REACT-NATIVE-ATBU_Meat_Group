import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import LoadScreen from '../../components/LoadScreen';
import firebase from '../../firebase/FirebaseConfig'


export default function DataDisplay(props) {
    const [Stock, setStock] = useState([])

    const StockRef = firebase.firestore().collection('stock');

    useEffect(() => {
        let tempDataHolder = [];
        StockRef
            .get().then((querySnapshot) => {
                if (querySnapshot.docs.length !== 0) {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        //console.log(doc.id, " => ", doc.data());
                        tempDataHolder = tempDataHolder.concat(doc.data())
                        setStock(tempDataHolder)
                    });
                }
            }).catch(err =>
                console.log(err)
            )

    }, [])

    console.log(Stock)
    return (
        <View style={styles.container}>
            {
                Stock.length !== 0 ?
                    <View>
                        <Text style={styles.headingStyle}> Summary of Cows in Stock </Text>
                        <DataTable >
                            <DataTable.Header>
                                <DataTable.Title>ID</DataTable.Title>
                                <DataTable.Title>Item</DataTable.Title>
                                <DataTable.Title>Price</DataTable.Title>
                                <DataTable.Title>Quantity</DataTable.Title>
                                {/* <DataTable.Title>Tail</DataTable.Title> */}
                                <DataTable.Title>Status</DataTable.Title>
                                {/* <DataTable.Title numeric>Age</DataTable.Title> */}
                            </DataTable.Header>

                            {
                                Stock.length !== 0 &&
                                Stock.map((data, index) => {
                                    return (

                                        <DataTable.Row key={index}>
                                            <DataTable.Cell style={styles.cellText}>{data.itemid}</DataTable.Cell>
                                            <DataTable.Cell style={styles.cellText}>{data.ItemName}</DataTable.Cell>
                                            <DataTable.Cell style={styles.cellText} numeric> NGN{data.itemAmount}</DataTable.Cell>
                                            <DataTable.Cell style={styles.cellText} numeric>{data.itemQty}</DataTable.Cell>
                                            <DataTable.Cell style={styles.cellText} >{data.itemQty !== 0 ? data.pstatus : 'empty'}</DataTable.Cell>
                                            {/* <DataTable.Cell style={styles.cellText} numeric>{data.pstatus}</DataTable.Cell> */}

                                            {/* <DataTable.Cell numeric>33</DataTable.Cell> */}
                                        </DataTable.Row>
                                    )
                                })

                            }

                        </DataTable>
                    </View>
                    :
                    <View style={styles.loadingStyle}>
                        <Text style={styles.loadingText1}>Loading Data  </Text>
                        <Text style={styles.loadingText2}>Please ensure your internet connection is turn ON</Text>
                        <LoadScreen />
                    </View>


            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        paddingHorizontal: 10,
    },
    loadingStyle: {
        marginTop: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText1: {
        color: 'red',
        fontSize: 19,
        alignSelf: 'center',
        textAlign: 'center',
    },
    loadingText2: {
        color: 'black',
        marginBottom: 30,
        fontSize: 19,
        alignSelf: 'center',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    headingStyle: {
        color: 'blue',
        marginBottom: 30,
        fontSize: 19,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    cellText: {
        textAlign: 'left',
        justifyContent: 'flex-start'
    }
});