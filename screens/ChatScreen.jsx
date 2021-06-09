import React, { Component } from 'react'
import { View, FlatList } from 'react-native'

export default class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            messages: []
        }
        this.conversationKey = this.props.navigation.state.params.conversationKey
    }
}