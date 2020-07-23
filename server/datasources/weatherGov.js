const { RESTDataSource } = require('apollo-datasource-rest');

class WeatherGovAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.weather.gov/';
  }

  codedObservationReducer(observation) {
    return observation.properties.rawMessage
  }

  forecastReducer(nextForecast) {
    return nextForecast.detailedForecast
  }

  async getCodedObservationsByLatLon({ lat, lon }) {
    const locationResponse = await this.get(`points/${lat},${lon}/stations`);
    const codedObservationsResponse = await this.get(`${JSON.parse(locationResponse).observationStations[0].split('https://api.weather.gov/')[1]}/observations/latest`);
    return this.codedObservationReducer(JSON.parse(codedObservationsResponse));
  }

  async getForecastByLatLon({ lat, lon }) {
    const locationResponse = await this.get(`points/${lat},${lon}`);
    const forecastResponse = await this.get(`${JSON.parse(locationResponse).properties.forecast.split('https://api.weather.gov/')[1]}`);
    return this.forecastReducer(JSON.parse(forecastResponse).properties.periods[1]);
  }
}

module.exports = WeatherGovAPI;