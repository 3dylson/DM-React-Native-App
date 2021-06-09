import React, { Component, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { firebase } from '../firebase/config'
// import styles from '../styles/passCodeStyle'
import SMSVerifyCode from 'react-native-sms-verifycode'
import styles from 'react-native-sms-verifycode/styles'

export default class PasscodeScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            code: null
        }
    }
    //const [code, setCode] = useState('')
    
    
    render(){
        return (
            
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">
                    <Image
                        style={styles.logo}
                        source={require('../assets/logo.png')}
                    />

                    <SMSVerifyCode style={styles.SMSVerifyCode}
                        verifyCodeLenght={4}
                    // ref={ref => (this.verifycode = ref)}
                    // onInputCompleted()=true
                        containerPaddingHorizontal={30}
                    />     
                    onInputCompleted (text) {
                    alert('text success'),
                    this.props.navigation.navigate('App')
                    }
                    
    
                    
                    
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}> <Text onPress={this.onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

{/* <SMSVerifyCode
  ref={ref => (this.verifycode = ref)}
  onInputCompleted={this.onInputCompleted}
  containerPaddingHorizontal={30}
/>
 
onInputCompleted = (text) => {
    Alert.alert(
      text,
      '本次输入的验证码',
      [
        {
          text: '确定',
        },
      ]
    )
}
 
reset = () => {
    this.verifycode.reset()
    this.setState({codeText: ''})
} */}