import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import {Button, TouchableOpacity, Text} from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, SignInScreen } from './screens'
import {decode, encode} from 'base-64'
import { firebase } from './firebase/config'

 if (!global.btoa) {  global.btoa = encode }
 if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

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
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home" 
            options={{          
              headerRight: () => (
              <Text style={{ marginRight: 30 }} onPress={() => signOut()}>
                Logout
              </Text>              
            ),
        }}>
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

