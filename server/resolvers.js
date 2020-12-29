module.exports = {
  Query: {
    weather: (_, { lat, lon }, { dataSources }) =>
      dataSources.openWeatherMapOneCallAPI.getWeatherByLatLon({ lat, lon }),
    codedObservation: (_, { lat, lon }, { dataSources }) =>
      dataSources.weatherGovAPI.getCodedObservationsByLatLon({ lat, lon }),
    nextForecastDescription: (_, { lat, lon }, { dataSources }) =>
      dataSources.weatherGovAPI.getForecastByLatLon({ lat, lon }),
    location: (_, { lat, lon }, { dataSources }) =>
      dataSources.googleGeocoderAPI.getLocationByLatLon({ lat, lon }),
  }
};