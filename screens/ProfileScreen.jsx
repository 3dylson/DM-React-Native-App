import React, {Component} from 'react'
import {Text, StyleSheet, View, Image, Animated, Button} from 'react-native'
import { firebase } from '../firebase/config'
import Loading from '../animations/Loading'

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            name: '',
            company: '',
            photo: '',
            userId: null
        }
    }

    checkParams = () => {
        var params = this.props.navigation.state.params;
        if (params.userId) {
            this.setState({ userId: params.userId })
        }
        this.fetchUserInfo(params.userId)
    }

    fetchUserInfo = (userId) => {
        // const usersRef = firebase.firestore().collection('users');

        //Get fullName from firebase db
        const userDoc = firebase.firestore().collection('users').doc(userId)
        
        userDoc.get()
        .then(firestoreDocument => {
            if (!firestoreDocument.exists) {    
                alert("User does not exist.")
                return;
            }
            this.setState({name: 
            })
        })
        

        

        // dbRef.child("users").child(userId).child('fullName').once('value')
        // then((snapshot) => {
        // if (snapshot.exists()) {
        //     console.log(snapshot.val());
        //     data = snapshot.val();
        //     this.setState({name: data })
        // } else {
        //     alert("No data available")
        //     console.log("No data available");
        // }
        // }).catch((error) => {
        //     alert(error)
        //     console.error(error);
        // });

        // //Get company 
        // dbRef.child("users").child(userId).child('company').once('value')
        // then((snapshot) => {
        // if (snapshot.exists()) {
        //     console.log(snapshot.val());
        //     data = snapshot.val();
        //     this.setState({company: data })
        // } else {
        //     alert("No data available")
        //     console.log("No data available");
        // }
        // }).catch((error) => {
        //     alert(error)
        //     console.error(error);
        // });

        // //Get profile photo
        // dbRef.child("users").child(userId).child('photo').once('value')
        // then((snapshot) => {
        // if (snapshot.exists()) {
        //     console.log(snapshot.val());
        //     data = snapshot.val();
        //     this.setState({photo: data, loaded: true })
        // } else {
        //     alert("No data available")
        //     console.log("No data available");
        // }
        // }).catch((error) => {
        //     alert(error)
        //     console.error(error);
        // });

    }

    componentDidMount() {
        this.checkParams()
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                {this.state.loaded == false ?
                    (
                        <Loading />
                    )
                    : (
                        // loggedin
                        <View style={{ flex: 1 }}>
                            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingVertical: 10, marginTop: 20 }}>
                                <Image
                                    source={{ uri: this.state.photo }}
                                    style={{ marginLeft: 10, width: 100, height: 100, borderRadius: 50 }}
                                />
                                <View style={{ marginRight: 10 }}>
                                    <Text>{this.state.name}</Text>
                                    <Text>{this.state.company}</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style={{ marginTop: 10, marginHorizontal: 40, paddingVertical: 15, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5 }}>
                                    <Text style={{ color: 'grey', textAlign: 'center' }}> {'Logout'} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginTop: 10, marginHorizontal: 40, paddingVertical: 15, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5 }}>
                                    <Text style={{ textAlign: 'center', color: 'grey' }}>{'Edit Profile'} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("Upload")}
                                    style={{ marginTop: 10, marginHorizontal: 40, paddingVertical: 25, backgroundColor: 'grey', borderRadius: 20, borderColor: 'grey', borderWidth: 1.5 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff' }}>{'Upload New +'} </Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ borderColor: '#555', borderWidth: 1 }} /> */}
                            <View style={{ backgroundColor: 'green', flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                                <Text>{"Loading Photos..."}</Text>
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd'
    }
});



