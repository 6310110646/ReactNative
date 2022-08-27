import React from "react";
import { Text, ImageBackground, StyleSheet } from "react-native"
import { useState, useEffect } from 'react';

import Forecast from './Forecast';

export default function Weather(props){
        useEffect(() => {
        console.log(`fetching data with zipCode = ${props.zipCode}`)
        if (props.zipCode) {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.zipCode},th&units=metric&APPID=0bf83bc8cae3ec34c7e1a057b93deacf`)
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
        main: "-",
        description: "-",
        temp: 0
    })
    return (
           <ImageBackground source={require('../img.jpg')} style={styles.backdrop}>
                <Text>Zip code</Text>
                <Text>{props.zipCode}</Text>
                <Forecast {...forecastInfo}/>
            </ImageBackground> 
    );
}
const styles = StyleSheet.create({
    backdrop: {
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
});