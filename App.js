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

import LoginScreen from './components/auth/Login'
import RegisterScreen from './components/auth/Register'
import MainScreen from './components/Main'

import{Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
 

const store = createStore(rootReducer, applyMiddleware(thunk))

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
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
              <Stack.Screen name="Register" component={RegisterScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar/>
        </SafeAreaProvider>
      );
    }
    return(
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
               <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}}/>              
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar/>
        </Provider>
      </SafeAreaProvider>
    )
  }
}



 
