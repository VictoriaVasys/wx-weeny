const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    weather(lat: Int!, lon: Int!): Weather
  }

  type Weather {
    current: CurrentWxType
  }

  type CurrentWxType {
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