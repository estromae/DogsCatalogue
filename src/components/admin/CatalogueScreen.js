import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, Image, Linking } from "react-native";
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'

import { dogsList, dogRemove } from "../../services/dogs/dogsServices";

export default function Catalogue({navigation, route}) {
    const [dogs, setDogs] = useState([])
    const [search, setSearch] = useState('');
    const [dogsId, setDogsId] = useState([])
    
    useEffect(() => {
        getDogs()
        needUpdate()
    }, [needUpdate()])

    function needUpdate() {
        if (route.params.wasUpdate) {
            getDogs()
            route.params.wasUpdate = false
        }
    }

    async function getDogs() {
        const result = await dogsList()
        setDogs(result._array)
    }

    function filter(input) {
        if (input == '') {
            getDogs()
        }
        setSearch(input)
        const resultFilter = dogs.filter((item) => {
            const breed = item.breed.toLowerCase()
            const searchText = input.toLowerCase()
            return breed.includes(searchText)
        })
        setDogs(resultFilter)
    }

    function handleDogsId() {
        setDogsId([])
        for (let index = 0; index < dogs.length; index++) {
            var idApi = dogs[index].idApi
            dogsId.push(idApi)
        }
        console.log("dogsId = " + dogsId)
    }

    function deleteDog(id) {
        console.log("Removido id: " + id)
        dogRemove(id)
        getDogs()
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
                    lightTheme={true}
                    round={true}
                    placeholder="Search for breed..."
                    onChangeText={filter}
                    value={search}
                    onClear={getDogs}
                />
                <TouchableOpacity onPress={() => getDogs()}>
                    <Icon style={styles.iconFeatures} name="reload1" size={25} color={'#000'}/>
                </TouchableOpacity>
                { route.params.level == 1 ?
                        <TouchableOpacity onPress={() => {
                                handleDogsId()
                                navigation.navigate("FindScreen", {dogsId: dogsId})
                                }
                            }>
                            <Icon style={styles.iconFeatures} name="pluscircle" size={25} color={'#000'}/>
                        </TouchableOpacity>
                    :
                    null
                }
            </View>
            <View style={{ height: '90%', width: '95%' }}>
                <FlatList
                    data={dogs}
                    renderItem={({item}) => 
                        <View style={styles.itemsList}>
                            <TouchableOpacity onPress={() => openUrl(item.infoUrl)}>
                                <Image style={[styles.item, styles.img]} source={{ uri: item.imgUrl }}/>
                            </TouchableOpacity>
                            <Text style={[styles.item, styles.textItem]}>{item.breed}</Text>
                            <Text style={[styles.item, styles.textItem]}>{item.origin}</Text>
                            { route.params.level == 1 ? 
                                (<Icon style={[styles.icon]} name="delete" size={25} color={'red'} onPress={() => deleteDog(item.id)}/>)
                                :
                                (<Icon style={[styles.icon]} name="edit" size={25} color={'#000'} onPress={() => navigation.navigate("EditScreen", {item: item})}/>)
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
        justifyContent: 'flex-end',
        margin: 5,
        height: '5%',
        width: '90%',
        // backgroundColor: 'blue',
    },

    containerInputSearchFeature: {
        flex: 1,
        backgroundColor: 'transparent',
        opacity: 0.3,
    },

    iconFeatures: {
        marginRight: 10,
        paddingLeft: 5,
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
        padding: 10,
    },

    textItem: {
        fontSize: 14,
    },

    icon: {
        marginLeft: 'auto',
    },
})