import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { firebase } from '../firebase/config'
import styles from '../styles/signInStyle';
//import BcryptReactNative from 'bcrypt-react-native';

export default function ProfileEditScreen() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [company, setCompany] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

   // const onFooterLinkPress = () => {
    //   navigation.navigate('Login')
    //}
    const onUpdatePress = () => {
        var user = firebase.auth().currentUser;
        if(password.trim()&&newPassword.trim()){
        //try {
            if(password == newPassword) {
                user.updatePassword(password).then(function() {
                alert("Passwords match.")
                  // Update successful.
                }).catch(function(error) {
                  throw new Error ("error")
                });}
            else {
                alert('Passwords dont match');
            }
        //}}catch(error){
           // alert('Passwords dont match');
                
        } else if (password.trim()&& !newPassword.trim()){
                alert('Must confirm new password')
            }

        if(fullName.trim()){
            alert('Full name changed')
        firebase.auth().currentUser.updateProfile(
            {fullName:fullName}
        ).then(function() {
          }).catch(function(error) {
            // An error happened.
          });}
          if(email.trim()){
            alert('Email changed')
          user.updateEmail({email:email}).then(function() {
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });}
          if(contact.trim()){
            alert('Contact changed')
          user.updateProfile({contact:contact}).then(function() {
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });} 
          if(company.trim()){
            alert('Company changed')
          user.updateProfile({company:company}).then(function() {
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });}  }


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
                            placeholder= 'fullname'
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
                    placeholder='Contact'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setContact(text)}
                    value={contact}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                        />
                   
               
                        <TextInput
                    style={styles.input}
                    placeholder='Company'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setCompany(text)}
                    value={company}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                        />
                    
                        <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='New password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                        />
                    
                        <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm New password'
                    onChangeText={(text) => setNewPassword(text)}
                    value={newPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                        />
                
                        
                        <TouchableOpacity
                        style={styles.button}
                        onPress={() => onUpdatePress()}
                        >
                        <Text style={styles.buttonTitle}>Submit changes</Text>
                    </TouchableOpacity>
                    

            
            </KeyboardAwareScrollView>
        </View> 
    )
}
