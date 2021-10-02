import firebase, { db } from '../../firebase/FirebaseConfig'

//Firestore Refs
const orderDataRef = db.collection('order');
const stockDataRef = db.collection('stock');
const costRef = db.collection("cost").doc("cost");
const usersRef = db.collection('users')

//ACTIONS
export const fectchAllOrderData = (dispatch, navigaton) => {

    let tempDataHolder = [];

    orderDataRef.get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    tempDataHolder = tempDataHolder.concat(doc.data())
                    dispatch({
                        type: 'FETCH_ORDER_DATA',
                        payload: tempDataHolder
                    })
                })
            }
            else if (querySnapshot.docs.length === 0) {
                alert('You have zero order!.')
                dispatch({
                    type: 'FETCH_ORDER_DATA',
                    payload: []
                })

                navigation.navigate('Home')
            }
            else {
                alert('Error occur, ensure you Turn ON your internet connection.')
                dispatch({
                    type: 'FETCH_ORDER_DATA',
                    payload: []
                })
            }
        })
        .catch(err =>
            console.log(err)
        )
}

export const fectchCurrentUserOrderData = (dispatch, user, navigation) => {
    let tempDataHolder = [];
    orderDataRef.where('user', '==', user.id)
        .get().then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    tempDataHolder = tempDataHolder.concat(doc.data())
                    dispatch({
                        type: 'FETCH_ORDER_DATA',
                        payload: tempDataHolder
                    })
                })
            }
            else {
                alert('You have zero order! Please make an order.')
                dispatch({
                    type: 'FETCH_ORDER_DATA',
                    payload: tempDataHolder
                })
                // setLoading(false)
                navigation.navigate('Home')


            }
        }).catch(err =>
            console.log(err)
        )
}

export const fetchQueryData = (dispatch, query, setLoading) => {
    let tempDataHolder = [];
    console.log(query);
    setLoading(true)
    query.get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    tempDataHolder = tempDataHolder.concat(doc.data())
                    dispatch({
                        type: 'FETCH_ORDER_DATA',
                        payload: tempDataHolder
                    })
                    setLoading(false)
                });
            }
            else {
                setLoading(false)
                alert('No match!')
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

}

export const login = (dispatch, email, password, setError, setLoading, navigation) => {
    setError('')
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            usersRef.doc(uid).get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        setError("User does not exist.Please Signup below")
                        setLoading(false)
                        return;
                    }
                    const user = firestoreDocument.data()

                    /*console.log(user)
                     === { 
                         "email": "admin@admin.com",
                         "fullName": "admin",
                         "id": "jWB4mPqXQDVdSZRzNeRUriGa8A92" 
                        }
                    */
                    dispatch({
                        type: 'GET_CURRENT_USER',
                        payload: user
                    })
                    if (user.fullName === 'admin') {
                        navigation.reset({
                            index: 1,
                            routes: [{ name: 'Home' }, { name: 'Admin' }],
                        })

                    }
                    else {
                        navigation.reset({
                            index: 1,
                            routes: [{ name: 'Home' }, { name: 'Ordering' }],
                        })
                    }
                })
                .catch(error => {
                    setError('Login Failed. Please try again.')
                    setLoading(false)
                    console.log(error)
                });
        })
        .catch(error => {
            //  setError('Login Failed. Please turn ON your internet connection.')
            setError(error.message)
            setLoading(false)
            console.log(error)
        })
}
export const Logout = () => {
    firebase.auth().signOut()
    dispatch({
        type: 'LOGOUT',
    })

}

export const PasswordResetAction = (email, setError, setLoading, navigation) => {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        setLoading(false)
        alert('Password reset mail is sent to ' + email)
        navigation.navigate('Login')
    })
        .catch((error) => {
            const errorCode = error.code;
            setLoading(false)
            setError(error.message)

        });


}
export const singUp = (dispatch, fullName, email, password, staffId, dept, phone, navigation, setError, setLoading) => {
    setError('')
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullName,
                staffId,
                dept,
                phone,
            };
            usersRef.doc(uid).set(data)
                .then(() => {
                    dispatch({
                        type: 'GET_CURRENT_USER',
                        payload: data
                    })
                    navigation.reset({ index: 1, routes: [{ name: 'Home' }, { name: 'Ordering' }], })
                })
                .catch((error) => {
                    setError('Login Failed. Please try again.')
                    setLoading(false)
                    console.log(error)
                });
        })
        .catch((error) => {
            // setError('Login Failed. Please turn ON your internet connection.')
            setLoading(false)
            setError(error.message)
            console.log(error)
        });
}

export const fetchAPIforOrderScreen = (dispatch, user, setTotalInCart, setAllinStock) => {
    // const costRef = db.collection("cost").doc("cost");
    let tempDataHolder = [];
    let tempStockDataHolder = [];
    //     // firebase.auth().signOut().then(() => {
    //     //     dispatch({
    //     //         type: 'LOGOUT',
    //     //     })

    orderDataRef.where("user", "==", user.id).get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    tempDataHolder = tempDataHolder.concat(doc.data())
                    setTotalInCart(tempDataHolder.length)
                })
            }
            else {
                console.log('No Data')
                setTotalInCart(0)
            }

        }).catch(err =>
            console.log(err)
        )


    stockDataRef.get()

        .then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    tempStockDataHolder = tempStockDataHolder.concat(doc.data())
                    setAllinStock(tempStockDataHolder)
                })
            }
        })

}

// export const addToCart = (dispatch, data, setLoading, setError, props) => {
//     console.log(data)
//     orderDataRef.add(data)
//         .then(() => {
//             alert('Successful! Thanks')
//             setLoading(false)
//             props.navigation.navigate('Cart')

//         })
//         .catch((err) => {
//             setError(err.message)
//             setLoading(false)
//             console.log(err)
//         })

// }


export const stockCowAction = (dispatch, data, setLoading, setError, props) => {
    console.log(data)
    stockDataRef.add(data)
        .then(() => {
            alert('Successful! Thanks')
            setLoading(false)
            props.navigation.navigate('Cart')
            dispatch(
                {
                    type: 'REFRESH'
                }
            )
        })
        .catch((err) => {
            setError(err.message)
            setLoading(false)
            console.log(err)
        })
}

export const fetchStock = (dispatch, setStockItem) => {
    let tempDataHolder = [];
    //fetch all stock data 
    stockDataRef.get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    tempDataHolder = tempDataHolder.concat(doc.data())
                    setStockItem(tempDataHolder)
                })
            }
            else {
                console.log('No Data')
                setTotalInCart(0)
            }
        }).catch(err =>
            console.log(err)
        )

}




export const addToCartorUpdateCart = (props, dispatch, user, item, tempStockQty, index, setLoading, data) => {
    console.log(item)
    console.log(tempStockQty)
    console.log(index)
    console.log('user is ' + user.id)
    console.log('itemId is ' + tempStockQty[index].itemid)
    orderDataRef.where('item.itemid', '==', tempStockQty[index].itemid)
        .where("user", "==", user.id)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    orderDataRef.doc(doc.id).update({
                        'orderQty': Math.round(parseInt(doc.data().orderQty) + parseInt(tempStockQty[index].counter)),
                        'totalPrice': Math.round(doc.data().totalPrice + Math.round(parseInt(tempStockQty[index].counter) * parseInt(doc.data().item.itemAmount)))
                    })

                    stockDataRef.where('itemid', '==', tempStockQty[index].itemid).get()
                        .then((querySnapshot) => {
                            if (querySnapshot.docs.length !== 0) {
                                querySnapshot.forEach((doc) => {
                                    // doc.data() is never undefined for query doc snapshots
                                    console.log(doc.id, " => ", doc.data());

                                    stockDataRef.doc(doc.id).update({
                                        'itemQty': Math.round(parseInt(doc.data().itemQty) - parseInt(tempStockQty[index].counter)),
                                    })

                                    alert('Successful! Thanks')
                                    setLoading(false)
                                    props.navigation.navigate('Cart')
                                })
                            }
                        })

                })

            }
            else {
                orderDataRef.add(data)
                    .then(() => {

                        stockDataRef.where('itemid', '==', tempStockQty[index].itemid).get()
                            .then((querySnapshot) => {
                                if (querySnapshot.docs.length !== 0) {
                                    querySnapshot.forEach((doc) => {
                                        // doc.data() is never undefined for query doc snapshots
                                        console.log(doc.id, " => ", doc.data());

                                        stockDataRef.doc(doc.id).update({
                                            'itemQty': Math.round(parseInt(doc.data().itemQty) - parseInt(tempStockQty[index].counter)),
                                        })
                                        alert('Successful! Thanks')
                                        setLoading(false)
                                        props.navigation.navigate('Cart')
                                    })
                                }
                            })

                    })
                    .catch((err) => {
                        setError(err.message)
                        setLoading(false)
                        console.log(err)
                    })
            }
        })
        .catch((err) => {
            setError(err.message)
            setLoading(false)
            console.log(err)
        })
}

export const updateStock = (dispatch, item, tempStockQty, index, setLoading) => {
    console.log(item.itemid)
    console.log(tempStockQty)
    console.log(index)
    stockDataRef.where('itemid', '==', tempStockQty[index].itemid)
        .get().then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    stockDataRef.doc(doc.id).update({
                        'itemQty': tempStockQty[index].itemQty + tempStockQty[index].counter
                    })
                    setLoading(false)
                })
            }
            // else {
            //     alert('You have zero order! Please make an order.')
            //     dispatch({
            //         type: 'FETCH_ORDER_DATA',
            //         payload: tempDataHolder
            //     })
            //     navigation.navigate('Ordering')
            // }
        }).catch(err =>
            console.log(err)
        )


}