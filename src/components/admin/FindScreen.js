import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, FlatList, Image, TouchableOpacity, Linking } from "react-native";
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'

import { getDataApi } from "../api";
import { dogCreate } from "../../services/dogs/dogsServices";

export default function Find({route}) {
    const [dogsApi, setDogsApi] = useState([])
    const [search, setSearch] = useState('')
    const [dogsId] = useState(route.params.dogsId)

    useEffect(() => {
        getDogsFromApi()
    }, [])

    async function getDogsFromApi() {
        try {
            const dogs = await getDataApi()
            const result = await dogs.json()
            setDogsApi(result)
        } catch (ex) {
            console.error("Error: " + ex)
            Alert.alert("Attention", "Error in data")
        }   
    }

    function filter(input) {
        if (input == '') {
            getDogsFromApi()
        }
        setSearch(input)
        const resultFilter = dogsApi.filter((item) => {
            const breed = item.breed.toLowerCase()
            const searchText = input.toLowerCase()
            return breed.includes(searchText)
        })
        setDogsApi(resultFilter)
    }

    function addDog(dog) {
        try {
            dogsId.push(dog.id)
            dogCreate(dog)
            alert("Success in add item")
        } catch (error) {
            alert("Error in add item")
        }
        console.log(dogsId)
    }

    async function openUrl(url) {
        const supported = await Linking.canOpenURL(url)
        if (supported) {
            await Linking.openURL(url)
        } else {
            Alert.alert("Attention", "Can`t open this link")
        }
    }
    
    function alert(message) {
        Alert.alert("Notice", message)
    }

    return (
        <View style={styles.container}>
            <View style={styles.features}>
                <SearchBar 
                    containerStyle={styles.containerInputSearchFeature}
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
                            { dogsId.includes(item.id) ? 
                                <Icon style={[styles.icon]} name="check" size={25} color={'#008000'}/>
                                :
                                <TouchableOpacity onPress={() => addDog(item)}>
                                    <Icon style={[styles.icon]} name="plus" size={25} color={'#000'}/>
                                </TouchableOpacity>
                            }
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