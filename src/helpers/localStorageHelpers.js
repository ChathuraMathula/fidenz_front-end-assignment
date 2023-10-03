
export const cacheWeatherData = (weatherData) => {
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

    const fiveMinutesInMS = 5 * 60 * 1000;
    if (Date.now() - timespan > fiveMinutesInMS) {
        localStorage.removeItem("weatherData");
        return null;
    }
    return data;

};