import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Loading extends Component {

    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <View style={styles.animationContainer}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{
                        width: 400,
                        height: 400,
                    }}

                    source={require('../assets/loading.json')}
                />
                <Text style={{ fontSize: 30, color: '#544334' }}>
                    {"Loading..."}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
});
