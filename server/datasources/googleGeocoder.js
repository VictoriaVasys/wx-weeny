const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config();

class GoogleGeocoder extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://maps.googleapis.com/';
  }

  willSendRequest(request) {
    request.params.set('key', process.env.EXPO_GOOGLE_KEY);
  }

  locationReducer(locationResponse) {
    let location = 'Los Angeles, CA'
    if (locationResponse['plus_code']) {
      const code = locationResponse['plus_code']['compound_code'].split(' ')
      code.shift()
      if (code.includes('USA')) {code.pop(); code[code.length - 1] = code[code.length - 1].slice(0, -1)}
      location = code.join(' ')
    }
    else {console.log("No reverse geocode results.")}

    return location;
  }

  async getLocationByLatLon({ lat, lon }) {
    const locationResponse = await this.get(`maps/api/geocode/json`, {latlng: `${lat},${lon}`});
    return this.locationReducer(locationResponse);
  }
}

module.exports = GoogleGeocoder;