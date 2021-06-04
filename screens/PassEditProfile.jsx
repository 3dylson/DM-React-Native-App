import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { firebase } from '../firebase/config'
import styles from '../styles/signInStyle';
//import BcryptReactNative from 'bcrypt-react-native';

export default function PassEditProfile({navigation}) {
    const [currentPassword, setCurrentPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('App')
    }
//const encrypt= (password) =>{

//const salt = BcryptReactNative.getSalt(10);
//const hash = BcryptReactNative.hash(salt, password);
//const pass = BcryptReactNative.compareSync(password, hash);
//return pass;
//}
    

    const onPassPress = () => {
        

        //setPassword = encrypt(password);
        if(currentPassword.trim()){
            try {
                if(firebase.auth().currentUser.password === currentPassword) alert('Allowed');
                navigation.navigate('profileEdit')
            } catch(error){
                alert('Password incorrect');
                    
            }
    } else {
            alert('Must enter passsword')
        } }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Current password'
                    onChangeText={(text) => setCurrentPassword(text)}
                    value={currentPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onPassPress()}
                    >
                    <Text style={styles.buttonTitle}>Enter</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Go Back? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Yes</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
