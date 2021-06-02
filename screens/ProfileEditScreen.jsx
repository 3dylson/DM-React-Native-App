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
   // const [confirmNewPassword, setConfirmNewPassword] = useState('')

   // const onFooterLinkPress = () => {
    //   navigation.navigate('Login')
    //}
   
    const onUpdateNamePress = () => {

        const update = {
            fullName: fullName
          }; 

        firebase
            .auth()
            .currentUser
            .updateProfile(update)
            .then((resp) => {
                if(resp.additionalUserInfo.currentUser) alert('User updated');
                const uid = resp.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)   // Gets the document reference associated to uid
                    .set(data)  // Add/Create data to the document reference
                    .then(() => {   // Set return a promise without parameter's
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                let errorCode =  error.code;
                let errorMessage = error.message;
                // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
                if(error.code=='auth/operation-not-allowed') alert('Registry with email and password is not enabled');
                if(error.code=='auth/weak-password') alert('Password is too weak');
                if(error.code=='auth/invalid-email') alert('Invalid email');
                if(error.code=='auth/email-already-in-use') alert('Email already in use');
                
        });
    }
    const onUpdateEmailPress = () => {}

    const onUpdatePasswordPress = () => {}

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
                <View style={styles.textButtonContainer}>
                    <View style={{width: '80%'}}>
                        <TextInput
                            style={styles.input}
                            //placeholder= {firebase.currentUser.fullName}
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setFullName(text)}
                            value={fullName}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View> 
                    <View style={{width: '20%'}}>
                        
                        <TouchableOpacity
                        style={styles.button}
                        onPress={() => onRegisterPress()}
                        >
                        <Text style={styles.buttonTitle}>Submit</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.textButtonContainer}>
                    <View style={{width: '80%'}}>
                        <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                        />
                    </View> 
                    <View style={{width: '20%'}}>
                        
                        <TouchableOpacity
                        style={styles.button}
                        onPress={() => onRegisterPress()}
                        >
                        <Text style={styles.buttonTitle}>Submit</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.textButtonContainer}>
                    <View style={{width: '80%'}}>
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
                    </View> 
                    <View style={{width: '20%'}}>
                        
                        <TouchableOpacity
                        style={styles.button}
                        onPress={() => onRegisterPress()}
                        >
                        <Text style={styles.buttonTitle}>Submit</Text>
                    </TouchableOpacity>
                    </View>
                </View>

            
            </KeyboardAwareScrollView>
        </View>
    )
}
