import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { firebase } from '../firebase/config'
import styles from '../styles/signInStyle';

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [contact, setContact] = useState('')
    const [company, setCompany] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((resp) => {
                if(resp.additionalUserInfo.isNewUser) alert('New user');
                const uid = resp.user.uid
                const data = {
                    id: uid,
                    contact,
                   // company,
                    email,
                    fullName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)   // Gets the document reference associated to uid
                    .set(data)  // Add/Create data to the document reference
                    .then(() => {   // Set return a promise without parameter's
                        navigation.navigate('App', {user: data})
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
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
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
            
                <RNPickerSelect
                    //onValueChange={(value) => console.log('lol')}
                    placeholder={styles.select}
                    style={styles.select}
                    onValueChange={(value) => setCompany(value)}
                    items={[
                        { label: "JavaScript", value: "JavaScript" },
                        { label: "TypeStript", value: "TypeStript" },
                        { label: "Python", value: "Python" },
                        { label: "Java", value: "Java" },
                        { label: "C++", value: "C++" },
                        { label: "C", value: "C" },
                    ]}
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
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
