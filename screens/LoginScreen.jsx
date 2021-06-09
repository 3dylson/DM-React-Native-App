import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { firebase } from '../firebase/config'
import styles from '../styles/loginStyle';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    //const [email, setEmail] = useState('')
    //const [password, setPassword] = useState('')

    onFooterLinkPress = () => {
        this.props.navigation.navigate('SignIn')
    }

    onLoginPress = () => {
        const {email, password} = this.state; 
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((resp) => {
                const uid = resp.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)   
                    .get()      
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {    
                            alert("User document does not exist.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        //navigation.navigate('App', {user})
                        this.props.navigation.navigate('App', {user})
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
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => this.setState({email: text})}
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={this.onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}}
export default LoginScreen