import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert, Image, TouchableOpacity } from "react-native";

import { dogUpdate } from "../../services/dogs/dogsServices";

export default function Edit({route}) {
    const [id] = useState(route.params.item.id)
    const [breed, setBreed] = useState(route.params.item.breed)
    const [origin, setOrigin] = useState(route.params.item.origin)
    const [infoUrl, setInfoUrl] = useState(route.params.item.infoUrl)
    const [imgUrl, setImgUrl] = useState(route.params.item.imgUrl)

    function setData() {
        const itemCurrent = {'id': id, 'breed': breed, 'origin': origin, 'url': infoUrl, 'img': imgUrl}
        saveUpdate(itemCurrent)
    }

    async function saveUpdate(item) {
        try {
            await dogUpdate(item)
            alert("Success in editing item")
        } catch (ex) {
            alert("Error in editing item")
            console.log(ex)
        }
    }

    function alert(message) {
        Alert.alert("Notice", message)
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemsContainer}>
                <Image style={styles.img} source={{ uri: imgUrl }}
                />
                <Text style={styles.labelInput}>Breed</Text>
                <TextInput style={styles.input}
                    onChangeText={setBreed}
                    value={breed}
                />
                <Text style={styles.labelInput}>Origin</Text>
                <TextInput style={styles.input}
                    onChangeText={setOrigin}
                    value={origin}
                />
                <Text style={styles.labelInput}>Know more</Text>
                <TextInput style={styles.input}
                    onChangeText={setInfoUrl}
                    value={infoUrl}
                />
                <Text style={styles.labelInput}>Url of the image</Text>
                <TextInput style={styles.input}
                    onChangeText={setImgUrl}
                    value={imgUrl}
                />
                <TouchableOpacity style={styles.button} onPress={() => setData()}>
                    <Text style={styles.textButton}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    itemsContainer: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#faedcd',
        borderRadius: 15,
    },

    img: {
        height: 250,
        width: 250,
        marginTop: 25,
        marginBottom: 10,
    },

    labelInput: {
        fontSize: 16,
    },

    input: {
        width: '80%',
        borderBottomWidth: 1,
        marginBottom: 10,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        borderRadius: 10,
        margin: 30,
        backgroundColor: '#0077b6',
    },

    textButton: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 4,
        paddingHorizontal: 4,
    },
})