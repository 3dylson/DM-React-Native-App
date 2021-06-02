import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import styles from '../styles/homeStyle';
import { firebase } from '../firebase/config'

export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('');
    const [entities, setEntities] = useState([]);
    const [entityToUpdate, setEntityToUpdate] = useState(null);

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

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            if(!entityToUpdate) {
                // FieldValue - Sentinel values that can be used when writing document fields with set() or update().
                // serverTimestamp() - Returns a sentinel used with set() or update() to include a server-generated timestamp in the written data.
                const timestamp = firebase.firestore.FieldValue.serverTimestamp();
                const data = {
                    text: entityText,
                    authorID: userID,
                    createdAt: timestamp,
                };
                entityRef
                    .add(data)
                    .then(_doc => {
                        setEntityText('')
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
                        setEntityText('');
                        setEntityToUpdate(null);
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }
        }
    }

    const onDeleteButtonPress = (entity) => {        
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

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText} onPress={() => {                    
                    setEntityText(item.text);
                    setEntityToUpdate(item);
                }}>
                        {index}. {item.text}        
                </Text>                
                <Button color="red" onPress={() => { onDeleteButtonPress(item) }} title={"X"}/>
            </View>
        )
    }


    const cancelUpdate = () => {
        setEntityToUpdate(null);
        setEntityText('');
    }

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
}
