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

const printWeather = data => {
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
};

export { printError, printSuccess, printHelp, printWeather };
