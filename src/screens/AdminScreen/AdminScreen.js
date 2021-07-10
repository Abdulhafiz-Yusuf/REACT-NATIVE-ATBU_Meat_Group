import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, BackHandler, StyleSheet, FlatList } from "react-native";
import LoadScreen from '../../components/LoadScreen';
import Card from './AdminCard'
import { useFocusEffect } from '@react-navigation/native';

import SearchBarComponent from './SearchBarComponent';
import { userStore } from '../../AppStore/UserStore';
import { fectchAllOrderData, fetchQueryData } from '../../AppStore/actions/UserActions'
import { db } from '../../firebase/FirebaseConfig'
import { View } from 'react-native';



export default function CartScreen({ navigation }) {
  // const user = props.route.params.user
  const { state, dispatch } = useContext(userStore)

  const orderData = state.orderData

  const [loading, setLoading] = useState(false)

  const [searchText, setSearchText] = useState('');
  const [radioValue, setRadioValue] = useState('');



  useEffect(() => {
    fectchAllOrderData(dispatch);
    const willFocusSubscription = navigation.addListener('focus', () => {
      fectchAllOrderData(dispatch);
    });

    return willFocusSubscription;
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );


  const orderDataRef = db.collection('order');

  const onSearchPress = () => {

    const QuerypendingStatusAndText = orderDataRef.where("pstatus", "==", "pending").where("oid", "==", searchText)
    const QuerypaidStatusAndText = orderDataRef.where("pstatus", "==", "paid").where("oid", "==", searchText)
    const QueryOnlyPendingStatus = orderDataRef.where("pstatus", "==", "pending")
    const QueryOnlyPaidStatus = orderDataRef.where("pstatus", "==", "paid")
    const QueryOnlySearchText = orderDataRef.where("oid", "==", searchText)

    if (radioValue === 'pending' & searchText !== '') {
      //firestore with pstatus===pending & oid === searchText (NB oid === order ID)
      fetchQueryData(dispatch, QuerypendingStatusAndText);
      console.log('pending and Text')

    }

    if (radioValue === 'paid' & searchText !== '') {
      //firestore with pstatus===paid & oid === searchText (NB oid === order ID)
      fetchQueryData(dispatch, QuerypaidStatusAndText, setLoading);
      console.log('paid and Text')
    }
    if (radioValue === 'pending' & searchText === '') {
      //firestore with only pstatus===pending
      fetchQueryData(dispatch, QueryOnlyPendingStatus, setLoading)
    }
    if (radioValue === 'paid' & searchText === '') {
      //firestore with only pstatus===paid
      fetchQueryData(dispatch, QueryOnlyPaidStatus, setLoading)
      console.log('paid only')
    }
    if (searchText.length !== 0 & radioValue === '') {
      fetchQueryData(dispatch, QueryOnlySearchText, setLoading)
      console.log('Text only')
    }
  }



  const renderItem = ({ item, index }) => {
    return (
      < Card data={item} index={index} />
    )
  }




  const [selectedId, setSelectedId] = useState(null);

  return (
    <View style={styles.container}>
      <SearchBarComponent
        onSearchPress={onSearchPress}
        searchText={searchText}
        radioValue={radioValue}
        setSearchText={setSearchText}
        setRadioValue={setRadioValue}
        loading={loading}
      />
      {
        !orderData ?
          <LoadScreen />
          :
          orderData.length !== 0 ?
            <FlatList
              style={styles.item}
              keyExtractor={(item, index) => index}
              extraData={selectedId}
              data={orderData}
              renderItem={renderItem}
            />
            :
            <LoadScreen />

      }

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  item: {

  },
  title: {
    fontSize: 16,
  },
  SearchBarContainer: {
    margin: 2,
  },
  SearchButton: {
    width: 70,
    margin: 1,
  }
});