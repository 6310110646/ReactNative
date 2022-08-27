import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native'
import Forecast from './Forecast';
import Constants from 'expo-constants';

export default function Weather(props) {
    useEffect(() => {
        console.log(`fetching data with zipCode = ${props.zipCode}`)
        if (props.zipCode) {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.zipCode},th&units=metric&APPID=06b18035cd2fe42858d498226ea77d0c`)
                .then((response) => response.json())
                .then((json) => {
                    setForecastInfo({
                        main: json.weather[0].main,
                        description: json.weather[0].description,
                        temp: json.main.temp
                    });
            })
            .catch((error) => {
                console.warn(error);
            });
        }
    }, [props.zipCode])

    const [forecastInfo, setForecastInfo] = useState({
        line: '',
        main: '',
        description: '',
        temp: 0
    })

    return (
        <ImageBackground source={require('../img.jpg')} style={styles.backdrop}>
        <View style={styles.highlight}>
            <View >
                <Text style={styles.time}>23.00</Text>
                <Text style={styles.date}>Monday, June 7</Text>
                
            </View>
            <View >
                <Text>{props.line}</Text>
                <Text style={styles.titleText}>Zip code is {props.zipCode}.</Text>
            </View>
            <View>
                <Forecast {...forecastInfo}/>
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    highlight: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        width:"100%", 
        height:"100%", 
        paddingTop: Constants.statusBarHeight, 
        alignItems: 'center'
    },

    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white',
        textAlign: 'center',
        fontWeight: '300'
    },

    time: {
        fontSize: 45,
        color: 'white',
        fontWeight: '300'
    },

    date: {
        fontSize: 25,
        color: 'white',
        fontWeight: '300'
    },

    section: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    }
});