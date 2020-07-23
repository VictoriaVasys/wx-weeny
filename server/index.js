const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const OpenWeatherMapOneCallAPI = require('./datasources/openWeatherMapOneCall');
const WeatherGovAPI = require('./datasources/weatherGov');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    openWeatherMapOneCallAPI: new OpenWeatherMapOneCallAPI(),
    WeatherGovAPI: new WeatherGovAPI(),
  })
});

server.listen().then(({ url }) => {
  console.log(`GraphQL server is running at ${url}`);
});