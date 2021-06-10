import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { firebase } from '../firebase/config'
import styles from '../styles/signInStyle';
import {connect} from 'react-redux'
//import BcryptReactNative from 'bcrypt-react-native';

function PassEditProfile({navigation},props) {
    const [currentPassword, setCurrentPassword] = useState('')
    const {currentUser} = props;

    const onFooterLinkPress = () => {
        navigation.navigate('App')
    }

    const onPassPress = () => {
        
   
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((resp) => {
            const uid = resp.user.uid
            const usersRef = firebase.firestore().collection('users')
            usersRef.doc(uid).get()
            .then(firestoreDocument => {
                if (!firestoreDocument.exists) {    
                    alert("User not register.")
                    return;
                }
                // const user = firestoreDocument.data()
                // Navigate
            })
            .catch((error) => {
                alert(error)
            });
        })
        .catch((error) => {
            let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode === 'auth/invalid-email') alert('Invalid email:'+errorMessage);
                if (errorCode === 'auth/user-not-found') alert('User not found'+errorMessage);
                if (errorCode === 'auth/wrong-password') alert('Wrong password.'+errorMessage);
                if (errorCode === 'auth/user-disabled') alert('User is not enabled'+errorMessage);          
    });
        //setPassword = encrypt(password);
        if(currentPassword.trim()){
            try {
                if(currentUser.password === currentPassword) alert('Allowed');
                navigation.navigate('profileEdit')
            } catch(error){
                alert('Password incorrect');
                    
            }
    } else {
            alert('Must enter passsword')
        } }


    return (
        
        <View style={styles.container}>
            {/* <Text>{currentUser.password}</Text> */}
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

const mapStateToProps = (store) => ({
currentUser: store.userState.currentUser
})
// const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);
export default connect(mapStateToProps,null)(PassEditProfile)
