import React, {useContext} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import { AppContext } from "./Home";
import { weatherConditions } from "../utils/WeatherConditions";

export default function WPCSurfaceAnalysis() {
  const weather = useContext(AppContext);
  console.log(weather)
  return (
    <View style={[styles.container, { backgroundColor: weatherConditions[weather.current.id].color }]}>
      <Text style={styles.title}>Surface Analysis</Text>
      <View style={styles.body}>
        <div style={{borderRadius: 4, marginBottom: 16, overflow: 'scroll'}}>
          <img
            src={'https://www.wpc.ncep.noaa.gov/sfc/namussfc15wbg.gif'}
            style={{width: '150%'}}
          />
        </div>
        <div style={{textAlign: 'center'}}>
          <img
            src={'https://www.wpc.ncep.noaa.gov/images/plotstation.gif'}
            style={{borderRadius: 4, width: '70%'}}
          />
          <Text style={styles.link} onPress={ ()=> Linking.openURL('https://www.wpc.ncep.noaa.gov/html/stationplot.shtml') } >More on decoding station plots</Text>
        </div>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B238F',
    height: '100%',
    padding: 24,
  },
  body: {
    justifyContent: 'center',
    height: '90%',
  },
  title: {
    color: '#FFF',
    fontFamily: 'Courier New',
    fontSize: 36,
    marginBottom: 16,
    textAlign: 'center',
  },
  link: {
    color: '#FFF',
    display: 'block',
    fontSize: 12,
  },
});