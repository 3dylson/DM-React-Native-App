import React, { useState, useEffect } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import styles from '../styles/homeStyle';
import { firebase } from '../firebase/config'
import { connect } from 'react-redux'

function OrdersScreen(props) {

    const[orders, setOrders] = useState([]);

    useEffect(() => {
        
            props.feed.sort(function(x,y){
                return x.creation - y.creation;
            })
            setOrders(props.feed);
        
        
    }, [props.feed])


    const onDetailsPress = (userId, orderId) => {
        // Ir ao servidor..
        // Navegar para vista detalhada da encomenda.. 

    } 

    return(
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={orders}
                    renderItem={({ item }) => (
                        <View
                            >
                            <Text >{item.id}</Text>
                            
                            <Text
                                onPress={() => props.navigation.navigate('DetailedOrder', { orderId: item.id, uid: item.user.uid })}>
                                View Details...
                                </Text>
                        </View>

                    )}

                />
            </View>
        </View>

    )
    
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    feed: store.usersState.feed,
})

export default connect(mapStateToProps,null)(OrdersScreen);

