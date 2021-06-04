import React, {Component} from 'react'
import {Text, StyleSheet, View, Image, Animated, Button} from 'react-native'
import AppContext  from '../context/AppContext';

export default function Profile({navigation}) {

    state = {
        fadeAnim: new Animated.Value(0)
    }      
        const user = firebase.auth().currentUser;
        return (
            <View style={styles.container}>
                <Button title="Edit" onPress={() => this.props.navigation.navigate("EditUser")}/>
                <View style={styles.header}>
                    <Image style={styles.image} 
                        source={
                            user.Avatar ? 
                                require("../assets/users/" + user.Avatar)
                            :   require("../assets/favicon.png")
                        } />
                </View>
                <View style={styles.body}>
                    <Text style={styles.bodyTitle}>About Me</Text>
                    <Animated.Text style={[styles.bodyDescription, { opacity: this.state.fadeAnim }]}>
                        {user.Description}
                    </Animated.Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.Number}>
                        <Text style={styles.text}>{user.Name}</Text>
                    </View>
                    <View style={styles.email}>
                        <Text style={styles.text}>{user.Email}</Text>
                    </View>
                </View>
            </View>
        )
    
}
Profile.contextType = AppContext;