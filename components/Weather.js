import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = ({ detailedForecast, temperature }) => {


  const condition = Object.keys(weatherConditions).find(condition => {
    return detailedForecast.includes(condition)
  })

  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[condition].color }
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.tempText}>{temperature}˚</Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          size={96}
          name={weatherConditions[condition].icon}
          color={'#fff'}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[condition].subtitle}</Text>
        <Text style={styles.description}>{detailedForecast}</Text>
      </View>
    </View>
  );
};

Weather.propTypes = {
  detailedForecast: PropTypes.string,
  temperature: PropTypes.string.isRequired,
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
    marginBottom: 16,
  },
  description: {
    color: '#fff',
    fontSize: 24,
  },
});

export default Weather;