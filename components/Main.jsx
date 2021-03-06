import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Loading from '../animations/Loading'
import {fetchUser, fetchUserOrders, clearData} from '../redux/actions/index'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import {OrdersScreen,ProfileScreen,ProfileEditScreen,PassEditProfile,ChatScreen,ManagerProfileScreen,OrderDetailsScreen,CheckOutScreen} from '../screens';


//import {OrdersStack, ProfileStack} from '../navigation/BottomTabNavigator'


const BottomTab = createBottomTabNavigator();
const OrdersStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const ProfileEditStack = createStackNavigator();
const CheckOutStack = createStackNavigator();
const ChatStack = createStackNavigator();

const CheckOutStackScreen = () => {
    return(
        <CheckOutStack.Navigator>
          <CheckOutStack.Screen
              name="CheckOut"
              component={CheckOutScreen}
              options={{ headerTitle: 'CheckOut'}}
              /> 
      </CheckOutStack.Navigator>
    )
}
const ChatStackScreen = () => {
    return(
        <ChatStack.Navigator>
          <ChatStack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ headerTitle: 'Chat'}}
              />
          <ChatStack.Screen
              name="ManagerProfile"
              component={ManagerProfileScreen}
              options={{ headerTitle: 'Manager'}}
              />

      </ChatStack.Navigator>
    )
}


const OrdersStackScreen = () => {
    return(
        <OrdersStack.Navigator>
          <OrdersStack.Screen
              name="Orders"
              component={OrdersScreen}
              options={{ headerTitle: 'Orders 🛒'}}
              />
          <OrdersStack.Screen
              name="DetailedOrder"
              component={OrderDetailsScreen}
              options={{ headerTitle: 'Details'}}
              />
              
      </OrdersStack.Navigator>
    )
} 


const ProfileStackScreen = () => {
    return(
        <ProfileStack.Navigator>
           <ProfileStack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{

                  headerTitle: 'My account'}}
          />
             <ProfileStack.Screen
                name="ProfileEdit"
                component={ProfileEditScreen}
                options={{
                    headerTitle: 'Edit my account',
                  //    headerRight:() => (
                  //        <Text style={{ marginRight: 30 }} onPress={() => }>
                  //            Logout
                  //        </Text> 
                  //    ) 
                }}
                
            />
          <ProfileStack.Screen
              name="PassEditProfile"
              component={PassEditProfile}
              options={{
                  headerTitle: 'Confirm your password'}}
          />
        </ProfileStack.Navigator>)
}

export class Main extends Component {
    componentDidMount(){
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserOrders();

    }


    render() {
        const {currentUser} = this.props;

        if(currentUser==undefined){
            return(
                <Loading/>
            )
        }
        return (
            <BottomTab.Navigator initialRouteName="Orders"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                    // You can explore the built-in icon families and icons on the web at:
                    // https://icons.expo.fyi/
                 if (route.name === 'Orders') {
                    iconName = focused
                      ? 'md-folder-open'
                      : 'md-folder-outline';
                } else if (route.name === 'CheckOut') {
                    iconName = focused ? 'ios-checkbox' : 'ios-checkbox-outline';
                } else if (route.name === 'Chat') {
                    iconName = focused ? 'chatbubbles' : 'chatbubble-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'ios-person' : 'ios-person-outline';
                }                
                return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
            tabBarOptions={{
                activeTintColor: 'steelblue',
                inactiveTintColor: 'gray',
          }}>
                <BottomTab.Screen name ="Orders" component={OrdersStackScreen}/>
                <BottomTab.Screen name ="CheckOut" component={CheckOutStackScreen}/>
                <BottomTab.Screen name ="Chat" component={ChatStackScreen}/> 
                <BottomTab.Screen name ="Profile" component={ProfileStackScreen}/>              
              </BottomTab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserOrders, clearData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
