import React, {Component} from 'react';
import { StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import Weather from './pages/Weather';
import Learning from './pages/Learning'
import WPCSurfaceAnalysis from './pages/WPCSurfaceAnalysis'
import Tweets from './pages/Tweets'

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });
const Tab = createBottomTabNavigator();
export const AppContext = React.createContext({ data: { weather: null } });


export default class App extends Component {
  state = {
    lat: 39.710850,
    lon: -105.081505,
    query: null,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
    const query = this.getCurrentQuery(this.state.lat, this.state.lon);
    this.setState({
      query
    });
  }

  getCurrentQuery = (lat, lon) => {
    return `
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
      }
    `
  }

  render() {
    const { lat, lon, query } = this.state;
    if (!query) return null;

    return (
      <ApolloProvider client={client}>
        <Query query={gql`${query}`} >
          {({ loading, error, data }) => {
            if (loading || error) return <Text style={styles.loading}>Fetching the Weather</Text>
            return (
              <AppContext.Provider value={{...data, lat, lon}} style={styles.loading}>
                <NavigationContainer>
                  <Tab.Navigator
                    screenOptions={({ route }) => ({
                      tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                          iconName = !focused ? 'home' : 'home-circle'
                        } else if (route.name === 'Learning') {
                          iconName = !focused ? 'thought-bubble-outline' : 'thought-bubble';
                        } else if (route.name === 'Surface Analysis') {
                          iconName = !focused ? 'weather-windy' : 'weather-windy-variant';
                        } else if (route.name === 'Tweets') {
                          iconName = !focused ? 'twitter' : 'twitter-circle';
                        }

                        // You can return any component that you like here!
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                      },
                    })}
                    tabBarOptions={{
                      activeTintColor: '#FFF',
                      inactiveTintColor: '#b0b8db',
                      style: {
                        backgroundColor: '#6271b7',
                        paddingBottom: '4px',
                      },
                    }}
                  >
                    <Tab.Screen name="Home" component={Weather} />
                    <Tab.Screen name="Surface Analysis" component={WPCSurfaceAnalysis} />
                    <Tab.Screen name="Learning" component={Learning} />
                    <Tab.Screen name="Tweets" component={Tweets} />
                  </Tab.Navigator>
                </NavigationContainer>
              </AppContext.Provider>
              )
          }}
          </Query>
      </ApolloProvider>
    )
  }
}

export const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    backgroundColor: '#6271b7',
    color: '#FFF',
    display: 'flex',
    fontFamily: 'Courier New',
    fontSize: 72,
    height: '100%',
    justifyContent: 'center',
    padding: 16,
    width: '100%',
  },
  container: {
    backgroundColor: '#6271b7',
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
    textTransform: 'capitalize',
  },
  subtitle: {
    color: '#fff',
    fontFamily: 'Courier New',
    fontSize: 24,
    marginBottom: 16,
  },
  description: {
    color: '#fff',
    fontFamily: 'Courier New',
    fontSize: 16,
  },
  weatherContainer: {
    backgroundColor: '#6271b7',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tempText: {
    color: '#fff',
    fontFamily: 'Courier New',
    fontSize: 60,
  },
  bodyContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 8,
  },
  observation: {
    color: '#fff',
    fontFamily: 'Courier New',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  link: {
    color: '#fff',
    display: 'block',
    fontFamily: 'Courier New',
    fontSize: 12,
    textDecorationLine: 'underline',
  }
});