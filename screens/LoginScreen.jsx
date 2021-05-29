import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../firebase/config'
import styles from './styles';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
            // Signs in using email and password 
            .signInWithEmailAndPassword(email, password)
            // Returns UserCredential
            // https://firebase.google.com/docs/reference/js/firebase.auth#usercredential
            .then((resp) => {
                const uid = resp.user.uid
                // FIRESTORE - Persistent server side
                // firebase.firestore() return a Firestore object
                // collection(path) - returns a CollectionReference associated to path
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)   // Gets the Document Reference associated to uid
                    // https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference?hl=pt-br#get
                    .get()      // Read de document associated to the Document Reference
                    .then(firestoreDocument => { // Returns a Promise with a parameter of type DocumentSnapshot
                        // https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot?hl=pt-br
                        if (!firestoreDocument.exists) {    
                            alert("User document does not exist.")
                            return;
                        }
                        // https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot?hl=pt-br#data
                        const user = firestoreDocument.data() // Retrieves all fields in the document as an Object. Returns 'undefined' if the document doesn't exist.
                        navigation.navigate('Home', {user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode === 'auth/invalid-email') alert('Invalid email:'+errorMessage);
                if (errorCode === 'auth/user-not-found') alert('User not found'+errorMessage);
                if (errorCode === 'auth/wrong-password') alert('Wrong password.'+errorMessage);
                if (errorCode === 'auth/user-disabled') alert('User is not enabled'+errorMessage);
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
