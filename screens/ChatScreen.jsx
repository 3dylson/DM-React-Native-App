/*import React, { Component, useState } from 'react'
import { render } from 'react-dom'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import styles from '../styles/chatStyle'


export default class ChatScreen extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

}



render(){
    return(
        <view style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />

                <TextInput

                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onSendPress}>
                        <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
                
            </KeyboardAwareScrollView>
        </view>
    )
} **/