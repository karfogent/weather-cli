#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather, getIcon} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length || typeof token === "boolean") {
        printError('There is no token value');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token saved');
    } catch (error) {
        printError(error.message);
    }
}

const saveCity = async (city) => {
    if (!city.length || typeof city === "boolean") {
        printError('There is no city value');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved');
    } catch (error) {
        printError(error.message);
    }
}
const getForecast = async() => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather?.weather[0]?.icon));
    } catch (error) {
        if (error?.response?.status === 404) {
            printError('Incorrect city')
        } else if (error?.response?.status === 401) {
            printError('Incorrect token')
        } else {
            printError(error.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForecast();
}

initCLI();