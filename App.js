import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from "react-native";

import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });
export const AppContext = React.createContext({ data: { weather: null } });


import Weather from './components/Weather';

export default class App extends React.Component {
  state = {
    query: null,
  };

    componentDidMount() {
    const query = this.getQuery();
    this.setState({
      query
    });
  }


  getQuery = (lat = 39, lon = -104) => {
    return `
      query getWeatherByLatLon {
        weather(lat: ${lat}, lon: ${lon}) {
          current {
            description,
            id,
            temperature,
          }
        }
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
            console.log(data.weather)
            return (
              <AppContext.Provider value={{...data.weather}} style={styles.container}>
              {/*<AppContext.Provider value={{...data.weather, onPress: this.onGetNewCondition}} style={styles.container}>*/}
                {loading ? <Text>Fetching The Weather</Text> : <Weather id={data.weather.current.id} description={data.weather.current.description} temperature={data.weather.current.temperature} />}
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