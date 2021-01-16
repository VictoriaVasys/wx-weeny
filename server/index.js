const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const cors = require('cors')
const express = require('express')

const OpenWeatherMapOneCallAPI = require('./datasources/openWeatherMapOneCall');
const WeatherGovAPI = require('./datasources/weatherGov');
const GoogleGeocoderAPI = require('./datasources/googleGeocoder');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    openWeatherMapOneCallAPI: new OpenWeatherMapOneCallAPI(),
    weatherGovAPI: new WeatherGovAPI(),
    googleGeocoderAPI: new GoogleGeocoderAPI(),
  })
});

const app = express();

app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
server.applyMiddleware({ app, path: '/graphql' });

app.listen(process.env.PORT || 4000 )