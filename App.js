import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import { API_KEY } from './utils/WeatherAPIKey';

import Weather from './components/Weather';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    this.fetchWeather()
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     this.fetchWeather(position.coords.latitude, position.coords.longitude);
    //   },
    //   error => {
    //     this.setState({
    //       error: 'Error Getting Weather Conditions'
    //     });
    //   }
    // );
  }

  fetchWeather(lat = 39, lon = -104) {
    fetch(
     `https://api.weather.gov/points/${lat},${lon}`
      // `https://api.weather.gov/points/${lat},${lon}`
    )
      .then(res => {
        return res.json()
      })
      .then(json => {
        fetch(json.properties.forecast)
          .then(res => {
            return res.json()
          })
          .then(forecast => {
            console.log({forecast})
            const nextForecast = forecast.properties.periods[1]
            this.setState({
              name: nextForecast.name,
              temperature: nextForecast.temperature,
              weatherCondition: nextForecast.shortForecast,
              isLoading: false
            });
          })

      })
  }

  render() {
    const { isLoading, temperature, weatherCondition } = this.state;
    console.log(this.state)
    return (
      <View style={styles.container}>
        {isLoading ? <Text>Fetching The Weather</Text> : <Weather weather={weatherCondition} temperature={temperature} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

// import React, { Component } from "react";
// import { ActivityIndicator } from "react-native";
//
// import { ApolloProvider, Query } from "react-apollo";
// import ApolloClient from "apollo-boost";
// import gql from "graphql-tag";
//
// const client = new ApolloClient({ uri: 'http://192.168.50.249:4000/graphql' });
//
// import Pokemon from "./src/components/Pokemon";
// import getRandomInt from "./src/helpers/getRandomInt";
//
// export const AppContext = React.createContext({ data: { pokemon: null } });
//
// export default class App extends Component {
//
//   state = {
//     query: null
//   }
//
//
//   componentDidMount() {
//     const query = this.getQuery();
//     this.setState({
//       query
//     });
//   }
//
//
//   getQuery = () => {
//     const randomID = getRandomInt(1, 807);
//     return `
//       query GetPokemonById {
//         pokemon(id: ${randomID}) {
//           id,
//           name,
//           desc,
//           pic,
//           types {
//             id,
//             name
//           }
//         }
//       }
//     `
//   }
//
//
//   render() {
//     const { query } = this.state;
//     if (!query) return null;
//
//     return (
//       <ApolloProvider client={client}>
//         <Query query={gql`${query}`} >
//           {({ loading, error, data }) => {
//             if (loading || error) return <ActivityIndicator size="large" color="#0000ff" />
//             return (
//               <AppContext.Provider value={{...data.pokemon, onPress: this.onGetNewPokemon}} style={styles.container}>
//                 <Pokemon />
//               </AppContext.Provider>
//             )
//           }}
//         </Query>
//       </ApolloProvider>
//     );
//   }
//   //
//
//   onGetNewPokemon = () => {
//     const query = this.getQuery();
//     this.setState({
//       query
//     });
//   }
//
// }
// //
//
// const styles = {
//   container: {
//     flex: 1
//   }
// };