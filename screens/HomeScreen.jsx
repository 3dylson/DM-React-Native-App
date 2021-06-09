import React, { Component, useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import styles from '../styles/homeStyle';
import { firebase } from '../firebase/config'

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entities: '',
            entityText:'',
            entityToUpdate: ''
        }
    }

    // checkParams = () => {
    //     var params = this.props.navigation.state.params;
    //     if (params.userId) {
    //         this.setState({ userId: params.userId })
    //     }
    //     this.fetchUserInfo(params.userId)
    // }

    // const [entityText, setEntityText] = useState('');
    // const [entities, setEntities] = useState([]);
    // const [entityToUpdate, setEntityToUpdate] = useState(null);

    //const entityRef = firebase.firestore().collection('entities')
    //const userID = props.extraData.id

    // useEffect(() => {
    //     entityRef
    //         .where("authorID", "==", userID)
    //         .orderBy('createdAt', 'desc')
    //         .onSnapshot(
    //             querySnapshot => {
    //                 const newEntities = []
    //                 querySnapshot.forEach(doc => {                        
    //                     const entity = doc.data() // Entity record, try alert(entity.text)
    //                     entity.id = doc.id
    //                     newEntities.push(entity)    // Update the state
    //                 });
    //                 setEntities(newEntities)
    //             },
    //             error => {
    //                 console.log(error)
    //             }
    //         )
    // }, [])

    onAddButtonPress = () => {
        if (this.state.entityText && this.state.entityText.length > 0) {
            if(!entityToUpdate) {
                // FieldValue - Sentinel values that can be used when writing document fields with set() or update().
                // serverTimestamp() - Returns a sentinel used with set() or update() to include a server-generated timestamp in the written data.
                const timestamp = firebase.firestore.FieldValue.serverTimestamp();
                const data = {
                    text: this.state.entityText,
                    authorID: userID,
                    createdAt: timestamp,
                };
                entityRef
                    .add(data)
                    .then(_doc => {
                        this.setState({entityText: ''})
                        Keyboard.dismiss()
                    })
                    .catch((error) => {
                        alert(error)
                    });
            }
            else {
                const {id, authorID} = entityToUpdate;
                entityRef
                    .doc(id)
                    .update({ ...entityToUpdate, text: entityText })
                    .then(() => {
                        alert(id + "updated with success");
                        this.setState({entityText: ''})
                        this.setState({entityToUpdate: null})
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }
        }
    }

    onDeleteButtonPress = (entity) => {        
        const { id } = entity;
        entityRef
            .doc(id)
            .delete()
            .then(() => {
                alert(id + "deleted with success");
            })
            .catch((error) => {
                alert(error);
            });
    }

    renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText} onPress={() => {
                    this.setState({entityText: item.text})
                    this.setState({entityToUpdate: item})
                }}>
                        {index}. {item.text}        
                </Text>                
                <Button color="red" onPress={() => { onDeleteButtonPress(item) }} title={"X"}/>
            </View>
        )
    }


    cancelUpdate = () => {
        this.setState({EntityToUpdate: null}),
        this.setState({entityText: ''})
    }
    render() {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
            {/* {entityToUpdate && 
                    <TouchableOpacity style={[styles.buttonCancel, { marginRight:10 }]} onPress={() => cancelUpdate()}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                 }
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>
                        { entityToUpdate ? "Update" : "Add" }
                    </Text>
                </TouchableOpacity>                
            </View>
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )} */}
        </View>
        </View>
    )
}}
