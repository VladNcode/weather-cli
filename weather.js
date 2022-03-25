#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

import { config } from 'dotenv';
config({ path: './config.env' });

console.log(process.env.API_KEY);

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

const initCLI = function () {
  const args = getArgs();

  if (args.h) {
    // Display help
    printHelp();
  }

  if (args.s) {
    // Save town
    // return saveData('town', args.s);
    getWeather('Kharkiv');
  }

  if (args.t) {
    // Save token
    return saveToken(args.t);
  }

  // Show weather
};

initCLI();
