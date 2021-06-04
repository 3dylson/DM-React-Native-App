import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { firebase } from '../firebase/config'
import styles from '../styles/loginStyle'
import SMSVerifyCode from 'react-native-sms-verifycode'

export default function PasswordScreen({navigation}) {
    const [code, setCode] = useState('')

    return (
        
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />

                <SMSVerifyCode
                    verifyCodeLenght={4}
                   // ref={ref => (this.verifycode = ref)}
                   // onInputCompleted()=true
                    containerPaddingHorizontal={30}
                />
                
 
                onInputCompleted (text) {
                    alert('text success')
                    .navigation.navigate('')
                }
                
                <View style={styles.footerView}>
                    <Text style={styles.footerText}> <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
