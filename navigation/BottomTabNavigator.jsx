import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//import * as React from 'react';
import React, { useEffect, useState } from "react";
import { firebase } from '../firebase/config'
import { HomeScreen, LoginScreen, ProfileScreen, SignInScreen } from '../screens';
import { AuthContext } from '../firebase/context'

const BottomTab = createBottomTabNavigator();

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const AuthStack = createStackNavigator();

export default function AuthStackScreen(logged) {
    return(
        <AuthStack.Navigator
        initialRouteName={
            logged ? "App" : "Login"
        }
        headerMode="none"
        >
            <AuthStack.Screen name="Login" component={LoginScreen}/>
            <AuthStack.Screen name="SignIn" component={SignInScreen}/>
            <AuthStack.Screen name="App" component={NavTab}/>
        </AuthStack.Navigator>        
    );
}

function NavTab(props) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(props.route.params.user);
    const [currentContext, setCurrentContext] = useState({
    user: user
  });

   useEffect(() => {
     const usersRef = firebase.firestore().collection('users').doc(user);
     firebase.auth().onAuthStateChanged(user => {
       if (user) {
         usersRef
           .doc(user.uid)
           .get()
           .then((document) => {
            const userData = document.data()
             setLoading(false)
             setUser(userData)
             setCurrentContext(userData)
           })
           .catch((error) => {
            setLoading(false)
           });
       } else {
        setLoading(false)
       }
     });
   }, []);

    
    return(
         <AuthContext.Provider value={currentContext}>
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                    // You can explore the built-in icon families and icons on the web at:
                    // https://icons.expo.fyi/
                 if (route.name === 'Home') {
                    iconName = focused
                      ? 'ios-home'
                      : 'ios-home-outline';
              }  else if (route.name === 'Profile') {
                    iconName = focused ? 'ios-person' : 'ios-person-outline';
                }  //else if Outras tabs aqui
                
                return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
            tabBarOptions={{
                activeTintColor: 'steelblue',
                inactiveTintColor: 'gray',
          }}>
              <BottomTab.Screen name ="Home" component={HomeStackScreen}/>
              <BottomTab.Screen name ="Profile" component={ProfileStackScreen}/>
              {/* Aqui vai as restantes screens para bottom nav */}
              </BottomTab.Navigator>
              //</AuthContext.Provider>
    
    );
}


const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerTitle: 'Feed 🛒'}}
                />
                {/* Restantes screens dentro da feed  */}
        </HomeStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen(props) {
    const [user, setUser] = useState(props.route.params.user);

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

    return(
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerTitle: 'My account',
                     headerRight:() => (
                         <Text style={{ marginRight: 30 }} onPress={() => signOut()}>
                             Logout
                         </Text> 
                     ) 
                }}
            />
        </ProfileStack.Navigator>
    );
}

// TODO Create stack for each(necessary) screen