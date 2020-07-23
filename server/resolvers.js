module.exports = {
  Query: {
    weather: (_, { lat, lon }, { dataSources }) =>
      dataSources.openWeatherMapOneCallAPI.getWeatherByLatLon({ lat, lon }),
    codedObservation: (_, { lat, lon }, { dataSources }) =>
      dataSources.WeatherGovAPI.getCodedObservationsByLatLon({ lat, lon }),
    nextForecastDescription: (_, { lat, lon }, { dataSources }) =>
      dataSources.WeatherGovAPI.getForecastByLatLon({ lat, lon }),
  }
};