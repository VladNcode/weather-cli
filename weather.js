#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { getKeyValue, saveKeyValue } from './services/storage.service.js';

const saveData = async (type, data) => {
  try {
    await saveKeyValue(`${type === 'token' ? 'token' : 'town'}`, data);
    printSuccess(`${type === 'token' ? 'Token' : 'Town'} was saved!`);
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
    return saveData('town', args.s);
  }

  if (args.t) {
    // Save token
    return saveData('token', args.t);
  }

  // Show weather
};

initCLI();
