import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList, Image, TouchableOpacity, Linking } from "react-native";
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'

import { getDataApi } from "../api";
import { dogCreate } from "../../services/dogs/dogsServices";

export default function Find() {
    const [dogsApi, setDogsApi] = useState([])
    const [search, setSearch] = useState('');

    useEffect(() => {
        getDogsFromApi()
    }, [])

    async function getDogsFromApi() {
        const dogs = await getDataApi()
        const result = await dogs.json()
        setDogsApi(result)
    }

    function filter(input) {
        console.log(input)
        setSearch(input)

        const resultFilter = dogsApi.filter((item) => {
            const breed = item.breed.toLowerCase()
            const searchText = input.toLowerCase()
            return breed.includes(searchText)
        })
        console.log(resultFilter)

        setDogsApi(resultFilter)
    }

    function addDog(dog) {
        console.log("Adicionar id: " + dog.id)
        dogCreate(dog)
    }

    async function openUrl(url) {
        const supported = await Linking.canOpenURL(url)
        if (supported) {
            await Linking.openURL(url)
        } else {
            Alert.alert("Attention", "Can`t open this link")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.features}>
                <SearchBar 
                    containerStyle={styles.containerInputSearchFeature}
                    inputContainerStyle={styles.inputSearchFeature}
                    lightTheme={true}
                    round={true}
                    placeholder="Search for breed..."
                    onChangeText={filter}
                    value={search}
                    onClear={getDogsFromApi}
                />
            </View>
            <View style={{ height: '90%', width: '95%' }}>
                <FlatList
                    data={dogsApi}
                    renderItem={({item}) => 
                        <View style={styles.itemsList}>
                            <TouchableOpacity onPress={() => openUrl(item.url)}>
                                <Image style={[styles.img, styles.item]} source={{ uri: item.img}}/>
                            </TouchableOpacity>
                            <Text style={[styles.item, styles.textItem]}>{item.breed}</Text>
                            <Text style={[styles.item, styles.textItem]}>{item.origin}</Text>
                            <Icon style={[styles.icon]} name="plus" size={25} color={'#000'} onPress={() => addDog(item)}/>
                        </View>
                    }
                />
            </View>  
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
    },

    features: {
        flex: 1,
        marginBottom: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        height: '5%',
        width: '90%',
    },

    containerInputSearchFeature: {
        flex: 1,
        backgroundColor: 'transparent',
        opacity: 0.3,
    },

    inputSearchFeature: {
        // backgroundColor: 'red',
    },

    iconFeatures: {
        marginRight: 10,
        marginLeft: 'auto',
    },

    itemsList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderBottomWidth: 1,
        padding: 10,
    },

    img: {
        height: 70,
        width: 70,
        marginRight: 40,
    },

    item: {
        flex: 1,
        padding: 5,
    },

    textItem: {
        fontSize: 14,
    },

    icon: {
        marginLeft: 'auto',
    },
})