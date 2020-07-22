module.exports = {
  Query: {
    forecast: (_, { lat, lon }, { dataSources }) =>
      dataSources.forecastAPI.getForecastByLatLon({ lat, lon })
  }
};