import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import {StatusBar} from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import {decode, encode} from 'base-64'
import { firebase } from './firebase/config'
import AuthStackScreen from './navigation/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

 if (!global.btoa) {  global.btoa = encode }
 if (!global.atob) { global.atob = decode }
 

 export default function App() {
  
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    //const AuthContext = React.createContext(user);
  

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
    <SafeAreaProvider>
    <NavigationContainer style={{flex: 1}}>
      {AuthStackScreen(user)}
    </NavigationContainer>
    <StatusBar/>
    </SafeAreaProvider>

  );

  }
 
