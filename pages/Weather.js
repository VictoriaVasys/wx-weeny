import React, {Fragment, useContext, useLayoutEffect} from 'react';
import { Image, Linking, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from '../utils/WeatherConditions';
import { AppContext, styles } from "../App";

const Weather = () => {
  const data = useContext(AppContext);
  const id = data.weather.current.id
  const codedObservation = data.codedObservation
  const description = data.nextForecastDescription
  const temperature = data.weather.current.temperature

  return (
    <View style={styles.weatherContainer}>
      <View style={[styles.titleContainer, {marginBottom: 0}]}>
        <MaterialCommunityIcons
          size={96}
          name={weatherConditions[id].icon}
          color="#C1E9C0"
        />
        <Text style={styles.tempText}>{Math.round(temperature * 10) / 10}˚</Text>
      </View>
      <Text style={[styles.subtitle, {marginBottom: 32}]}>{`${weatherConditions[id].title}... ${weatherConditions[id].subtitle}`}</Text>
      <div style={{borderRadius: 16, overflow: 'scroll'}}>
        <img
          id="spc-overview"
          alt="Storm Prediction Center products overview"
          src="https://www.spc.noaa.gov/products/activity_loop.gif"
          style={{objectFit: 'none', width: '150%'}}
        />
      </div>
      <View style={styles.bodyContainer}>
        {/*<Text style={[styles.title, {marginBottom: 0}]}>Denver</Text>*/}
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.observation}>{codedObservation}</Text>
        <Text style={styles.link} onPress={ ()=> Linking.openURL('http://www.theweatherprediction.com/jargon/') } >Glossary of NWS Forecast Discussion Jargon</Text>
      </View>
    </View>
  );
};

export default Weather;