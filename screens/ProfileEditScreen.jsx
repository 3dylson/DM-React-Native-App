import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { firebase } from '../firebase/config'
import styles from '../styles/editProfileStyle'; 
//import BcryptReactNative from 'bcrypt-react-native';

export default function ProfileEditScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

   // const onFooterLinkPress = () => {
    //   navigation.navigate('Login')
    //}
    const onUpdatePress = () => {
        var user = firebase.auth().currentUser;
        if(password.trim()||confirmPassword.trim()){
        try {
            if(password == confirmPassword) {
                user.updatePassword(password).then(function() {
                  // Update successful.
                }).catch(function(error) {
                  // An error happened.
                });
            alert("Passwords match.")
        }}catch(error){
            alert('Passwords dont match');
                
        }} else{
            alert('Must confirm new password')
        } 
        if(fullName.trim()){
        user.updateProfile({
            fullName:fullName
        }).then(function() {
          }).catch(function(error) {
            // An error happened.
          });}
          if(fullName.trim()){
          user.updateEmail(email).then(function() {
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });}}


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
                            //placeholder= {firebase.currentUser.fullName}
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setFullName(text)}
                            value={fullName}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                   
               
                        <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                        />
                    
                        <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                        />
                    
                        <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setNewPassword(text)}
                    value={newPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                        />
                
                        
                        <TouchableOpacity
                        style={styles.button}
                        onPress={() => onRegisterPress()}
                        >
                        <Text style={styles.buttonTitle}>Submit changes</Text>
                    </TouchableOpacity>
                    

            
            </KeyboardAwareScrollView>
        </View>
    )
}
