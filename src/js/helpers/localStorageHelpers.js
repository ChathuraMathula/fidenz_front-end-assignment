import { CACHE_EXPIRE_TIME_IN_MILISECONDS } from "../constants/constants";

export const cacheWeatherData = (weatherData) => {
    if (!weatherData) {
        return;
    }
    const timespan = Date.now();
    const cachedData = {
        data: weatherData,
        timespan: timespan,
    };

    localStorage.setItem("weatherData", JSON.stringify(cachedData));
};

export const fetchCachedWeatherData = () => {

    const cachedData = localStorage.getItem("weatherData");
    if (!cachedData) {
        return null;
    }
    const { data, timespan } = JSON.parse(cachedData);

    const currTimeGap = Date.now() - timespan;

    if (currTimeGap > CACHE_EXPIRE_TIME_IN_MILISECONDS) {
        localStorage.removeItem("weatherData");
        return null;
    }
    return data;

};

export const cacheCityName = (cityname) => {

    const cachingData = {
        cityname: cityname,
    };

    localStorage.setItem("CityWeatherData", JSON.stringify(cachingData));
}

export const removeCachedCityName = () => {
    localStorage.removeItem("CityWeatherData");
}

export const getCachedCityName = () => {
    const cachedData = localStorage.getItem("CityWeatherData");
    if (!cachedData) {
        return null;
    }

    const { cityname } = JSON.parse(cachedData);

    return cityname;
}