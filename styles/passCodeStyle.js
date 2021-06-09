import SMSVerifyCode from 'react-native-sms-verifycode'
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
SMSVerifyCode:{
  verifyCodeLength=6,
  containerPaddingVertical=10,
  containerPaddingHorizontal=50,
  containerBackgroundColor="#8DC647",
  codeViewBorderColor="#000000",
  focusedCodeViewBorderColor="#0000FF",
  codeViewBorderWidth=3,
  codeViewBorderRadius=16}
})
/* <SMSVerifyCode
  verifyCodeLength={5}
  codeFontSize={26}
  // codeColor={'#89C047'}
/> */
