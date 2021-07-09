import React from 'react'
import { FlatList } from "react-native";


function CartList({ selectedId, orderData, renderItem, }) {
    return (
        <FlatList
            keyExtractor={(item, index) => index}
            extraData={selectedId}
            data={orderData}
            renderItem={renderItem}
        />

    )
}

export default CartList
