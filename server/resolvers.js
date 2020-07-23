module.exports = {
  Query: {
    weather: (_, { lat, lon }, { dataSources }) =>
      dataSources.openWeatherMapOneCallAPI.getWeatherByLatLon({ lat, lon })
  }
};