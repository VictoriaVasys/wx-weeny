const { OPEN_WEATHER_MAP_KEY } = require('../../utils/APIKeys');

const { RESTDataSource } = require('apollo-datasource-rest');

class OpenWeatherMapOneCallAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.openweathermap.org/';
  }

  willSendRequest(request) {
    request.params.set('appid', OPEN_WEATHER_MAP_KEY);
    request.params.set('exclude', 'minutely');
    request.params.set('units', 'imperial');
  }

  currentWxReducer(currentWx) {
    return {
      current: {
        description: currentWx.current.weather[0].description,
        id: currentWx.current.weather[0].main,
        temperature: currentWx.current.temp,
      }
    };
  }

  async getWeatherByLatLon({ lat, lon }) {
    const currentWxResponse = await this.get(`data/2.5/onecall`, {lat, lon});
    return this.currentWxReducer(currentWxResponse);
  }
}

module.exports = OpenWeatherMapOneCallAPI;