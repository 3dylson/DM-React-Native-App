import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import {Button, TouchableOpacity, Text} from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoginScreen, HomeScreen, SignInScreen, ChatScreen, CheckOutScreen, MyOrdersScreen, ProfileScreen } from './screens'
import {decode, encode} from 'base-64'
import { firebase } from './firebase/config'
import AuthStackScreen from './navigation/BottomTabNavigator';
import { render } from 'react-dom';

 if (!global.btoa) {  global.btoa = encode }
 if (!global.atob) { global.atob = decode }
 

 export default function App() {
  
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
  

  /*
  if (loading) {	
    return (	
      <></>	
    )	
  }*/

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);
  
  const signOut = () => {
    firebase
    .auth()
    .signOut()
    .then(() => { 
      setUser(null);
      console.info('Logged out');
    })
    .catch((error) => {
      console.error(error);
    });
  }

  
  return (
    <NavigationContainer style={{flex: 1}}>
      {AuthStackScreen(user)}
    </NavigationContainer>

  );

  }
 
