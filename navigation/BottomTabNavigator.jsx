import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//import * as React from 'react';
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import {signOut} from'../redux/actions/index'
import { firebase } from '../firebase/config'
//import { OrdersScreen, LoginScreen, ProfileScreen, SignInScreen } from '../screens';



// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const OrdersStack = createStackNavigator();
const CheckOutStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ProfileStack = createStackNavigator();


 function OrdersStack() {
  return(
      <OrdersStack.Navigator>
          <OrdersStack.Screen
              name="Orders"
              component={OrdersScreen}
              options={{ headerTitle: 'Orders 🛒'}}
              />
              {/* Restantes screens dentro do orders  */}
      </OrdersStack.Navigator>
  );} 


 function ProfileStack(){
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