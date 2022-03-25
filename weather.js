#!/usr/bin/env node

import dedent from 'dedent';
import chalk from 'chalk';
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async token => {
  if (!token.length) {
    return printError('No token provided!');
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token was saved!');
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async city => {
  if (!city.length) {
    return printError('No city provided!');
  }

  try {
    await getWeather(city);
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City was saved!');
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('City is incorrect!');
    } else if (e?.response?.status === 401) {
      printError('Token is incorrect!');
    } else {
      printError(e.message);
    }
  }
};

const getForecast = async () => {
  try {
    const city = await getKeyValue('city');
    const data = await getWeather(city);
    // Pretty weather output
    const { name, weather, wind, sys, main } = data;

    const obj = {
      cityName: name,
      country: sys.country,
      status: weather[0].description,
      temperature: main.temp,
      feelsLike: main.feels_like,
      windSpeed: wind.speed,
      sunrise: new Date(sys.sunrise * 1000).toTimeString().split(' ')[0],
      sunset: new Date(sys.sunset * 1000).toTimeString().split(' ')[0],
    };

    const { cityName, country, status, temperature, feelsLike, windSpeed, sunset, sunrise } = obj;

    console.log(dedent`
      🚩 ${chalk.black.bgYellowBright('Страна:        ')} ${chalk.black.bgGreenBright(country)}
      🏙  ${chalk.black.bgYellowBright('Город:         ')} ${chalk.black.bgGreenBright(cityName)}
      🌥  ${chalk.black.bgYellowBright('Облачность:    ')} ${chalk.black.bgGreenBright(status)}
      🌡  ${chalk.black.bgYellowBright('Температура:   ')} ${chalk.black.bgGreenBright(temperature)}
      🕺 ${chalk.black.bgYellowBright('Чувствуется:   ')} ${chalk.black.bgGreenBright(feelsLike)}
      💨 ${chalk.black.bgYellowBright('Скорость ветра:')} ${chalk.black.bgGreenBright(windSpeed)} 
      🌅 ${chalk.black.bgYellowBright('Рассвет:       ')} ${chalk.black.bgGreenBright(sunrise)}
      🌄 ${chalk.black.bgYellowBright('Закат:         ')} ${chalk.black.bgGreenBright(sunset)}
    
    `);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('City is incorrect!');
    } else if (e?.response?.status === 401) {
      printError('Token is incorrect!');
    } else {
      printError(e.message);
    }
  }
};

const initCLI = function () {
  const args = getArgs();

  if (args.h) {
    // Display help
    return printHelp();
  }

  if (args.s) {
    // Save city
    return saveCity(args.s);
  }

  if (args.t) {
    // Save token
    return saveToken(args.t);
  }

  // Show weather
  getForecast();
};

initCLI();
