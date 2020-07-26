import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from "react-native";

import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });
export const AppContext = React.createContext({ data: { weather: null } });


import Weather from '../components/Weather';

export default class Home extends React.Component {
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
    const { query } = this.state;
    if (!query) return null;

    return (
      <ApolloProvider client={client}>
        <Query query={gql`${query}`} >
        {({ loading, error, data }) => {
            if (loading || error) return <ActivityIndicator size="large" color="#0000ff" />
            const weatherProps = {
              id: data.weather.current.id,
              codedObservation: data.codedObservation,
              description: data.nextForecastDescription,
              lat: this.state.lat,
              lon: this.state.lon,
              temperature: data.weather.current.temperature,
            }
            return (
              <AppContext.Provider value={{...data.weather}} style={styles.container}>
              {/*<AppContext.Provider value={{...data.weather, onPress: this.onGetNewCondition}} style={styles.container}>*/}
                {loading ?
                  <Text>Fetching The Weather</Text> :
                  <Weather {...weatherProps} />}
              </AppContext.Provider>
            )
          }}
        </Query>
      </ApolloProvider>
    );
  }

  // onGetNewCondition = () => {
  //   const query = this.getQuery();
  //   this.setState({
  //     query
  //   });
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});