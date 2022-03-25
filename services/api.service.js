import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeather = async function (city) {
  const token = process.env.TOKEN || (await getKeyValue(TOKEN_DICTIONARY.token));

  if (!token) {
    throw new Error('API KEY not set, set it with "-t [API_KEY]"');
  }

  // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  // url.searchParams.append('q', city);
  // url.searchParams.append('appid', token);
  // url.searchParams.append('lang', 'ru');
  // url.searchParams.append('units', 'metric');

  // https.get(url, response => {
  //   let result = '';
  //   response.on('data', chunk => {
  //     result += chunk;
  //   });
  //
  //   response.on('end', () => {
  //     console.log(JSON.parse(result));
  //   });
  // });

  const url = 'https://api.openweathermap.org/data/2.5/weather';
  const params = {
    q: city,
    appid: token,
    lang: 'ru',
    units: 'metric',
  };

  const { data } = await axios.get(url, { params });
  return data;
};

export { getWeather };
