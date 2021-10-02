import React from 'react'
import { Text, View, } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { Avatar, } from 'react-native-paper'

function ListItem({ title, description, icon }) {
    return (


        < View >
            {
                icon ?
                    <View style={{ flexDirection: 'row', margin: 20 }}>
                        <Avatar.Icon size={24} icon={icon} />

                        <View style={{ marginLeft: 30 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
                            <Text style={{ color: 'grey', fontSize: 14 }}>{description}</Text>
                        </View>
                    </View>
                    :
                    <View style={{ margin: 5 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
                        <Text style={{ color: 'grey', fontSize: 14 }}>{description}</Text>

                    </View>

            }

        </View >

    )
}

export default ListItem
