import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';
import WindyMap from "./WindyMap";
import { WINDY_KEY } from "../utils/APIKeys";

const Weather = ({ codedObservation, description, id, lat, lon, temperature }) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[id].color }
      ]}
    >
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={96}
          name={weatherConditions[id].icon}
          color={'#fff'}
        />
        <Text style={styles.tempText}>{temperature}˚</Text>
      </View>
      <WindyMap lat={lat} lon={lon} windyKey={WINDY_KEY} />
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[id].title}</Text>
        <Text style={[styles.subtitle, {color: weatherConditions[id].subColor}]}>{weatherConditions[id].subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.observation}>{codedObservation}</Text>
        <Text style={styles.link} onPress={ ()=> Linking.openURL('http://www.theweatherprediction.com/jargon/') } >Glossary of NWS Forecast Discussion Jargon</Text>
      </View>
    </View>
  );
};

Weather.propTypes = {
  description: PropTypes.string,
  temperature: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  weatherContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    padding: 8,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tempText: {
    color: '#fff',
    fontSize: 72,
  },
  bodyContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    color: '#fff',
    fontSize: 48,
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  description: {
    color: '#fff',
    fontSize: 16,
  },
  observation: {
    color: '#fff',
    fontSize: 12,
    marginTop: 16,
  },
  link: {
    color: '#4d79ff',
    fontSize: 10,
  }
});

export default Weather;