const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const OpenWeatherMapOneCallAPI = require('./datasources/openWeatherMapOneCall');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    openWeatherMapOneCallAPI: new OpenWeatherMapOneCallAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`GraphQL server is running at ${url}`);
});