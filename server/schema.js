const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    forecast(lat: Int!, lon: Int!): Forecast
  }

  type Forecast {
    name: String
    temperature: String
    weatherCondition: String
  }
`;

module.exports = typeDefs;

// type Pokemon {
//   id: ID!
//   name: String
//   desc: String
//   pic: String
//   types: [PokemonType]
// }

// type PokemonType {
//   id: Int
//   name: String
// }