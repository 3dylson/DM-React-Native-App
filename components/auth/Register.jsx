import React, { Component } from 'react'
import { View, Button, TextInput, TouchableOpacity, Image } from 'react-native'
import styles from '../../styles/signInStyle'
import logo from '../../assets/logo.png'
import {Picker} from '@react-native-picker/picker';
import {firebase} from '../../firebase/config';

export class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: '',
            fullName: '',
            contact: '', 
            email: '',
            company: '',
            password: '',
            confirmPassword: ''
        }

        this.onRegisterPress = this.onRegisterPress.bind(this)

    }

    onRegisterPress(){
        const {fullName, contact, email, company, password, confirmPassword} = this.state;
        if (password.trim() && !confirmPassword.trim()) {
            alert("Must confirm password")
            return
        }
        else if(password !== confirmPassword){
            alert("Passwords don't match.")
            return
        }

        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((resp) => {
            if(resp.additionalUserInfo.isNewUser) alert('New User created!');
            const uid = resp.user.uid
            const data = {
                id: uid,
                fullName,
                contact,
                email,
                company,
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef.doc(uid).set(data)
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

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">
                    <Image
                        style={styles.logo}
                        source={require(logo)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Full Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => this.setState({fullName: text})}
                        value={this.state.fullName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Contact'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => this.setState({contact: text})}
                        value={this.state.contact}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />

                    <Picker
                        style={styles.input}
                        placeholder='Company'
                        placeholderTextColor="#aaaaaa"
                        selectedValue={this.state.company}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({company: itemValue})
                        }>
                            <Picker.Item label="IPB" value="ipb"/>
                            <Picker.Item label="TheMarket" value="tmarket"/>
                        </Picker>
                
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => this.setState({email:text})}
                        value={this.state.email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Confirm Password'
                        onChangeText={(text) => this.setState({confirmPassword: text})}
                        value={this.state.confirmPassword}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.onRegisterPress()}>
                        <Text style={styles.buttonTitle}>Create account</Text>
                    </TouchableOpacity>
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Already got an account? <Text onPress={this.onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default Register
