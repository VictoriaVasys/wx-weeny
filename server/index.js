const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

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

server.listen().then(({ url }) => {
  console.log(`GraphQL server is running at ${url}`);
});