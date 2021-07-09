import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { db } from '../../firebase/FirebaseConfig'
import LoadScreen from '../../components/LoadScreen';
import Card from './Card'
import CartList from './CartList';
import SearchBarComponent from './SearchBarComponent';
import { userStore } from '../../AppStore/UserStore';
import { fectchCurrentUserOrderData, fetchQueryData } from '../../AppStore/actions/UserActions'

export default function CartScreen({ navigation }) {
  //const user = props.route.params.user
  const { state, dispatch } = useContext(userStore)
  const user = state.user
  const orderData = state.orderData

  const [loading, setLoading] = useState(false)

  const [searchText, setSearchText] = useState('');
  const [radioValue, setRadioValue] = useState('');

  useEffect(() => {


    fectchCurrentUserOrderData(dispatch, user, navigation);
    const willFocusSubscription = navigation.addListener('focus', () => {
      fectchCurrentUserOrderData(dispatch, user, navigation);
    });

    return willFocusSubscription;
  }, [])



  const orderDataRef = db.collection('order');


  const onSearchPress = () => {

    const QuerypendingStatusAndText = orderDataRef.where("pstatus", "==", "pending").where("oid", "==", searchText).where('user', '==', user.id)
    const QuerypaidStatusAndText = orderDataRef.where("pstatus", "==", "paid").where("oid", "==", searchText).where('user', '==', user.id)
    const QueryOnlyPendingStatus = orderDataRef.where("pstatus", "==", "pending").where('user', '==', user.id)
    const QueryOnlyPaidStatus = orderDataRef.where("pstatus", "==", "paid").where('user', '==', user.id)
    const QueryOnlySearchText = orderDataRef.where("oid", "==", searchText).where('user', '==', user.id)

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
      < Card data={item} index={index} navigation={navigation} />
    )
  }




  const [selectedId, setSelectedId] = useState(null);

  return (



    <SafeAreaView style={styles.container}>

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
          <LoadScreen /> :
          orderData.length !== 0 ?
            <CartList
              selectedId={selectedId}
              orderData={orderData}
              renderItem={renderItem} />
            :
            <LoadScreen />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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