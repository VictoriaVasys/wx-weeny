import React, { useEffect, useState, Fragment } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { AntDesign, Feather, Fontisto, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { gql, useQuery } from '@apollo/client';

import Weather from './pages/Weather';
import Learning from './pages/Learning'
import WPCSurfaceAnalysis from './pages/WPCSurfaceAnalysis'
import Tweets from './pages/Tweets'
import styled from 'styled-components';

const Tab = createBottomTabNavigator();
export const AppContext = React.createContext({ data: { weather: null } });

// const FadeOutView = (props) => {
//   const fadeAnim = useRef(new Animated.Value(1)).current  // Initial value for opacity: 0
//
//   useEffect(() => {
//     Animated.timing(
//       fadeAnim,
//       {
//         toValue: 0,
//         duration: 1000,
//       }
//     ).start();
//   }, [fadeAnim])
//
//   return (
//     <Animated.View                 // Special animatable View
//       style={{
//         ...props.style,
//         opacity: fadeAnim,         // Bind opacity to animated value
//       }}
//     >
//       {props.children}
//     </Animated.View>
//   );
// }

export const Container = styled.div`
  height: 100%;
  max-height: 840px;
  max-width: 440px;
  width: 100%;

  & > div {
    height: 100%;
  }
`

const getCurrentQuery = (lat, lon) => {
  return gql`
      query GetWeatherByLatLon {
        weather(lat: ${lat}, lon: ${lon}) {
          current {
            description,
            id,
            temperature,
          }
        }
        codedObservation(lat: ${lat}, lon: ${lon})
        nextForecastDescription(lat: ${lat}, lon: ${lon})
        location(lat: ${lat}, lon: ${lon})
      }
    `
}

export default function MainContainer() {
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        setLat(lat)
        setLon(lon)
      },
      () => {
        const lat = 34.0522
        const lon = -118.2437
        setLat(lat)
        setLon(lon)
      },
    );
  })

  const { loading, error, data } = useQuery(getCurrentQuery(lat, lon));

  const LoadingScreen = (
    <Text style={styles.loading}>
      <Image style={styles.logo} source={require('./assets/wx-weeny-logo.png')} />
      <Image style={styles.loadingIndicator} source={require('./assets/rolling.svg')} />
    </Text>
  )
  const WxApp = (
    <Fragment>
      {/*<FadeOutView style={styles.loading}><Image style={styles.loadingImage} source={require('./assets/wx-weeny-logo.png')} /></FadeOutView>*/}
      <AppContext.Provider value={{...data, lat, lon}}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color }) => {
                let iconName;

                if (route.name === 'Home') {
                  return focused ? <Fontisto name="home" size={20} color={color} /> : <SimpleLineIcons name="home" size={20} color={color} />
                } else if (route.name === 'Surface') {
                  iconName = !focused ? 'wind' : 'cloudy-gusts';
                  return <Fontisto name={iconName} size={20} color={color} />
                } else if (route.name === 'Learning') {
                  iconName = !focused ? 'lightbulb-on-outline' : 'lightbulb-on';
                  return <MaterialCommunityIcons name={iconName} size={24} color={color} />
                } else if (route.name === 'Tweets') {
                  return focused ? <AntDesign name="twitter" size={22} color={color} /> : <Feather name="twitter" size={22} color={color} />
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: '#C1E9C0',
              adaptive: false,
              inactiveTintColor: '#878F9B',
              style: {
                backgroundColor: '#232323',
                paddingBottom: '6px',
                paddingTop: '4px',
              },
            }}
          >
            <Tab.Screen name="Home" component={Weather} />
            <Tab.Screen name="Surface" component={WPCSurfaceAnalysis} />
            <Tab.Screen name="Learning" component={Learning} />
            <Tab.Screen name="Tweets" component={Tweets} />
          </Tab.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </Fragment>
  )

  const content = (loading || Boolean(error) || !Boolean(data)) ? LoadingScreen : WxApp
  return <Container>{content}</Container>
}


export const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    backgroundColor: '#232323',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 16,
    width: '100%',
  },
  logo: {
    height: 160,
    width: 160,
  },
  loadingIndicator: {
    marginTop: 16,
    height: 40,
    width: 40,
  },
  container: {
    backgroundColor: '#232323',
    height: '100%',
    padding: 24,
    width: '100%',
  },
  body: {
    justifyContent: 'center',
    height: '90%',
  },
  title: {
    color: '#C1E9C0',
    fontFamily: 'Courier New',
    fontSize: 36,
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  subtitle: {
    color: '#C1E9C0',
    fontFamily: 'Courier New',
    fontSize: 24,
    marginBottom: 16,
  },
  description: {
    color: '#C1E9C0',
    fontFamily: 'Courier New',
    fontSize: 16,
  },
  weatherContainer: {
    // animation: 'fadeInAnimation ease 3s',
    // animationKeyFrames: '',
    // animationIterationCount: 1,
    // animationFillMode: 'forwards',
    backgroundColor: '#232323',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    padding: 16,
  },
  titleContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  flexColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  locationText: {
    color: 'white',
    fontFamily: 'Courier New',
    fontSize: 16,
    paddingRight: 8,
    textAlign: 'right',
  },
  tempText: {
    color: '#C1E9C0',
    fontFamily: 'Courier New',
    fontSize: 60,
    textAlign: 'right',
  },
  bodyContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 8,
  },
  observation: {
    color: '#C1E9C0',
    fontFamily: 'Courier New',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  link: {
    color: '#C1E9C0',
    display: 'block',
    fontFamily: 'Courier New',
    fontSize: 12,
    textDecorationLine: 'underline',
  }
});