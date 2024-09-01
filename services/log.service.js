import chalk from 'chalk';
import dedent from "dedent-js";
const printError = (error) => {
    console.log(chalk.bgRed(' ERROR: ') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan(' HELP ') + ' '}
         Without parameters - weather output
         -s [CITY] for saving city
         -h for help
         -t [API_KEY] for saving token
        `)
    )
};

const printWeather = (res, icon) => {
    console.log(
        dedent(`${chalk.bgYellowBright(' WEATHER ') + ` Weather in the ${res.name} city`}
         ${icon} ${res?.weather[0]?.description}
         Temperature: ${res?.main?.temp} (feel like ${res?.main?.feels_like})
         Humidity: ${res?.main?.humidity}%
         Wind speed: ${res?.wind?.speed}.
        `)
    )
}

export {printError, printSuccess, printHelp, printWeather};