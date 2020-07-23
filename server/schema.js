const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    weather(lat: Int!, lon: Int!): Weather,
    codedObservation(lat: Int!, lon: Int!): String,
    nextForecastDescription(lat: Int!, lon: Int!): String
  }

  type Weather {
    current: CurrentWx
  }

  type CurrentWx {
    description: String,
    id: String,
    temperature: Float,
  }
`;

module.exports = typeDefs;

// type DailyType {
//   days: [DaysType]
// }
//
// type DaysType {
//   temp: Int
//   forecast: String
// }

//
// type CurrentType {
//   temp: Int
//   wind_speed: Int
//   weather: [WeatherType]
// }
//
// type WeatherType {
//   main: String
//   description: String
// }
//
// type DailyType {
//   temp: [DailyTempType]
//   weather: [WeatherType]
// }
//
// type DailyTempType {
//   max: Int
//   min: Int
// }