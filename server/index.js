const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const cors = require('cors')

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

server.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});