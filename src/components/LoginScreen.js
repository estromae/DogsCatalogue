import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from "react-native";

import { userCreateTable, dogCreateTable, dropTable } from '../services/startDb'
import { listUsers } from "../services/authentification/signIn";

export default function Home({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        dropTable("user")
        // dropTable("dog")
        userCreateTable()
        dogCreateTable()
        // navigation.navigate('CatalogueScreen', {level: 1})
    }, [])

    function handleInputs(email, password) {
        if (email != '' && password != '') {
            getUsers()
        } else {
            alertErrorLogin("Preencha todos os campos para o login")
        }
    }

    async function getUsers(){
        let users = [] 
        users = await listUsers()
        autenEmailUser(users)
    }

    function autenEmailUser(users) {
        let rowCurrent
        let emailCurrent
        for (let index = 0; index < users.length; index++) {
            rowCurrent = users._array[index]
            emailCurrent = rowCurrent.email
            if (email == emailCurrent) {
                console.log("Email correto")
                return autenPassUser(rowCurrent)
            }
        }
        alertErrorLogin("Email não confere")
    }

    function autenPassUser(user) {
        if (password == user.password) {
            console.log("Usuário confere")
            goToScreen(user)
        } else {
            alertErrorLogin("Senha não confere")
        }
    }

    function goToScreen(user) {
        navigation.navigate('CatalogueScreen', {level: user.level})

    }

    function alertErrorLogin(error) {
        Alert.alert("Notice", error)
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemsContainer}>
                <View>
                    <Text style={styles.title}>Welcome</Text>
                </View>
                <TextInput style={styles.input}
                    onChangeText={setEmail}
                    placeholder="Email..."
                    autoCapitalize="none"
                />
                <TextInput style={styles.input}
                    onChangeText={setPassword}
                    placeholder="Password..."
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={() => handleInputs(email, password)}>
                    <Text style={styles.textButton}>Login</Text>
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
        height: '50%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },

    input: {
        margin: 10,
        height: 30,
        width: '70%',
        fontSize: 16,
        borderBottomWidth: 1,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        margin: 30,
        borderRadius: 10,
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