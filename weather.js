#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
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
    const city = process.env.CITY || (await getKeyValue('city'));
    const data = await getWeather(city);
    printWeather(data);
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
  return getForecast();
};

initCLI();
