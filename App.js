import 'react-native-gesture-handler';
import React, { Component } from 'react'
import {StatusBar} from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import {decode, encode} from 'base-64'
import AuthStackScreen from './navigation/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from './firebase/context';

 if (!global.btoa) {  global.btoa = encode }
 if (!global.atob) { global.atob = decode }
 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer style={{flex: 1}}>
          { AuthStackScreen(this.context.isLogged)}
        </NavigationContainer>
        <StatusBar/>
      </SafeAreaProvider>
    )
  }
}

App.contextType = AuthContext;

 
