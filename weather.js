#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';

const initCLI = function () {
  const args = getArgs();
  console.log(args);

  printError();
  printSuccess();

  if (args.h) {
    // Display help
    printHelp();
  }

  if (args.s) {
    // Save town
  }

  if (args.t) {
    // Save token
  }

  // Show weather
};

initCLI();
