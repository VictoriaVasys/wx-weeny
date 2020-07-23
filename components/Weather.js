import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = ({ codedObservation, description, id, temperature }) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[id].color }
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.tempText}>{temperature}˚</Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          size={96}
          name={weatherConditions[id].icon}
          color={'#fff'}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[id].title}</Text>
        <Text style={[styles.subtitle, {color: weatherConditions[id].subColor}]}>{weatherConditions[id].subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.observation}>{codedObservation}</Text>
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
    border: '16px solid white',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    padding: 8,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
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
});

export default Weather;