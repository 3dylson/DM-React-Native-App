import React, { Component } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { firebase } from '../firebase/config'
import styles from '../styles/signInStyle';

export default class RegistrationScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            fullName: "",
            contact: "", 
            company: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }
    //const [fullName, setFullName] = useState('')
    //const [contact, setContact] = useState('')
    //const [company, setCompany] = useState('')
    //const [email, setEmail] = useState('')
    //const [password, setPassword] = useState('')
    //const [confirmPassword, setConfirmPassword] = useState('')

    onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    onRegisterPress = () =>{
    //if (password !== confirmPassword) {
           // alert("Passwords don't match.")
           // return
        //}

        const {fullName, contact, company, email, password, confirmPassword} = this.state;
        if(this.password.trim()&&this.confirmPassword.trim()){
            //try {
                if(this.password == this.confirmPassword) {

                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)  // this?
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
                                    //navigation.navigate('App', {user: data})
                                    this.props.navigation.replace('App',{user: data})
                                })
                                .catch((error) => {
                                    alert(error)
                                });
                        })
                        .catch(error => {
                            let errorCode =  error.code;
                            let errorMessage = error.message;
                            // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
                            if(errorCode==='auth/operation-not-allowed') alert('Registry with email and password is not enabled');
                            if(errorCode==='auth/weak-password') alert('Password is too weak');
                            if(errorCode==='auth/invalid-email') alert('Invalid email');
                            if(errorCode==='auth/email-already-in-use') alert('Email already in use');
                        })
                }
                else {
                    alert('Passwords dont match');
                }
                    
            } 
            else if (password.trim()&& !confirmPassword.trim()){
                alert('Must confirm new password')
            }
    }

    render() {
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
                        onChangeText={(text) => this.setState({fullName: text})}
                        value={this.fullName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Contact'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => this.setState({contact: text})}
                        value={this.contact}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />

                    <RNPickerSelect
                        //placeholder={styles.select}
                        placeholder={{}}
                        onValueChange={(value) => this.setState({company: value})}
                        style={styles.select}
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
                        onChangeText={(text) => this.setState({email:text})}
                        value={this.email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Confirm Password'
                        onChangeText={(text) => this.setState({confirmPassword: text})}
                        value={this.confirmPassword}
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
