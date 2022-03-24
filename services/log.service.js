import chalk from 'chalk';
import dedent from 'dedent';

const printError = error => {
  console.log(`${chalk.black.bgRed('ERROR:')} ${error}`);
};

const printSuccess = success => {
  console.log(`${chalk.black.bgGreen('SUCCESS:')} ${success}`);
};

const printHelp = () => {
  console.log(dedent`${chalk.black.bgCyan('HELP:')}
      No parameters: Show weather
      -s [CITY]: Save town
      -t [API_KEY]: Save token
      -h: show help`);
};

export { printError, printSuccess, printHelp };
