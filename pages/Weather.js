import React, {useContext} from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
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
      <View style={[styles.headerContainer, {marginBottom: 0}]}>
        <MaterialCommunityIcons
          size={96}
          name={weatherConditions[id].icon}
          color="#fff"
        />
        <Text style={styles.tempText}>{Math.round(temperature * 10) / 10}˚</Text>
      </View>
      <Text style={[styles.subtitle, {marginBottom: 32}]}>{`${weatherConditions[id].title}... ${weatherConditions[id].subtitle}`}</Text>
      <div style={{borderRadius: 4, overflow: 'scroll'}}>
        <img
          id="spc-overview"
          alt="Storm Prediction Center products overview"
          src="https://www.spc.noaa.gov/products/activity_loop.gif"
          style={{width: '150%'}}
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