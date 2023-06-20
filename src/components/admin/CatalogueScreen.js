import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, Image, Linking } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'

import { dogsList, dogRemove } from "../../services/dogs/dogsServices";

export default function Catalogue({navigation, route}) {
    const [dogs, setDogs] = useState([])
    
    useEffect( () => {
        getDogs()
    }, [])

    async function getDogs() {
        const result = await dogsList()
        console.log(result)
        console.log(result._array)
        console.log(result._array[0].imgUrl)
        console.log(result._array[0].breed)
        console.log(result._array[0].origin)
        console.log(result._array[0].infoUrl)
        setDogs(result._array)
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
                <Icon style={styles.iconFeatures} name="reload1" size={25} color={'#000'} onPress={() => getDogs()}/>
                { route.params.level == 1 ?
                    (<Icon style={styles.iconFeatures} name="plus" size={25} color={'#000'} onPress={() => navigation.navigate("FindScreen")}/>)
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