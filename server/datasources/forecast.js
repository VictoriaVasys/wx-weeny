const { RESTDataSource } = require('apollo-datasource-rest');

class ForecastAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.weather.gov/';
  }

  forecastReducer(nextForecast) {
    return {
      name: nextForecast.name,
      temperature: nextForecast.temperature,
      detailedForecast: nextForecast.detailedForecast,
    };
  }

  async getForecastByLatLon({ lat, lon }) {
    const locationResponse = await this.get(`points/${lat},${lon}`);
    const forecastResponse = await this.get(`${JSON.parse(locationResponse).properties.forecast.split('https://api.weather.gov/')[1]}`);
    return this.forecastReducer(JSON.parse(forecastResponse).properties.periods[0]);
  }
}

module.exports = ForecastAPI;