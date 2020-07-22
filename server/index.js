const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const ForecastAPI = require('./datasources/forecast');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    forecastAPI: new ForecastAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`GraphQL server is running at ${url}`);
});