import React, {Component} from 'react'
import {Text,TouchableOpacity,ScrollView, StyleSheet, View, Image, Alert,  Animated, Button} from 'react-native'
import { firebase } from '../firebase/config'
import styles from '../styles/profile'
import {connect} from 'react-redux'


function ProfileScreen (props)  {
    const {currentUser} = props;

      
    
    const logout = () => {
        firebase.auth().signOut();
    }
    // if(currentUser==undefined){
    //     return(
    //         <Loading/>
    //     )
    // }
           return (

            
      
            <View style={styles.container}>
            <View style={styles.logoContainer}>
            <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
            </View>
                <View style={styles.bodyTitleView}>
                    <Text style={styles.bodyTitle}>Personal data</Text>
                    </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.fieldsContainer}>
                <View style={styles.lableContainer}>
                <Text style={styles.textLable}>Full name:</Text> 
                </View>
                <View style={styles.textContainer}>
                <Text style={styles.text}>{currentUser.fullName}</Text> 
                </View>
                </View>
                <View style={styles.fieldsContainer}>
                <View style={styles.lableContainer}>
                <Text style={styles.textLable}>Email:</Text> 
                </View>
                <View style={styles.textContainer}>
                <Text style={styles.email}>{currentUser.email}</Text> 
                </View>
                </View>
                <View style={styles.fieldsContainer}>
                <View style={styles.lableContainer}>
                <Text style={styles.textLable}>Contact:</Text> 
                </View>
                <View style={styles.textContainer}>
                <Text style={styles.text}>{currentUser.contact}</Text> 
                </View>
                </View>
                <View style={styles.fieldsContainer}>
                <View style={styles.lableContainer}>
                <Text style={styles.textLable}>Company:</Text> 
                </View>
                <View style={styles.textContainer}>
                <Text style={styles.text}>{currentUser.company}</Text> 
                </View>
                </View>
                {/* <Animated.Text style={[styles.bodyDescription, { opacity: this.state.fadeAnim }]}>
                    {user.Description}
                </Animated.Text> */}
                {/* <View style={styles.text}>
                    { <Text style={styles.text}>{currentUser.fullName}</Text> }
                </View>
                <View style={styles.text}>
                    { <Text style={styles.text}>{currentUser.company}</Text> }
                </View> */}
        </ScrollView>
                <View style={styles.buttonView}>
            <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => props.navigation.navigate("PassEditProfile")}>
                    <Text style={styles.buttonTitle}>edit data</Text>
                </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => 
                        Alert.alert(
                        'Logout?',
                        'Press OK to logout',
                      [
                        {
                          text: "Cancel",
                          onPress: () => null,
                          style: "cancel"
                        },
                        { text: "OK", onPress: () => logout()}
                      ]
                    )}
                    style={styles.logoutButton}>
                    <Text style={styles.buttonTitle}>logout </Text>
                </TouchableOpacity>
                </View>
        </View>
        )
        }

            const mapStateToProps = (store) => ({
            currentUser: store.userState.currentUser
            })
            // const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);
           export default connect(mapStateToProps,null)(ProfileScreen)