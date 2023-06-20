import { StyleSheet, Text, View, Button } from 'react-native';

const dogName = 'golden retriever'
const url = 'https://dog-breeds2.p.rapidapi.com/dog_breeds';
const options = {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': '61e8f7d419mshc343b89bb21d1b5p1419d1jsna851098e23ee',
		'X-RapidAPI-Host': 'dog-breeds2.p.rapidapi.com'
    }
};

async function getDataApi() {
    try {
        const response = await fetch(url, options);
        // const result = await response.text();
        console.log(response);
        return response
    } catch (error) {
        console.error(error);
    }
}

export { getDataApi }


