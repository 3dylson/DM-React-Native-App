import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {firebase} from './firebase/config';
import {View, Text} from 'react-native';
import Loading from './animations/Loading';
import {StatusBar} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {decode, encode} from 'base-64';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
 

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const {loggedIn, loaded} = this.state;
    if(!loaded){
      return(
        <Loading style={{ flex: 1, justifyContent: 'center'}}/>
      )
    }
    if(!loggedIn){
      return (
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
              <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
              <Stack.Screen name="Register" component={RegisterScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar/>
        </SafeAreaProvider>
      );
    }
    return(
      <View>
        <Text>
          User is logged!
        </Text>
      </View>
    )
  }
}



 
