
export const cacheWeatherData = (weatherData) => {
    const timespan = Date.now();
    const cachedData = {
        data: weatherData,
        timespan: timespan,
    };

    localStorage.setItem("weatherData", JSON.stringify(cachedData));
};

export const fetchCachedWeatherData = () => {
    try {
        const cachedData = localStorage.getItem("weatherData");
        if (!cachedData) {
            throw new Error(`No cached weather data.`);
        }
        const { data, timespan } = JSON.parse(cachedData);

        const fiveMinutesInMS = 5 * 60 * 1000;
        if (Date.now() - timespan > fiveMinutesInMS) {
            localStorage.removeItem("weatherData");
            throw new Error(`Cached weather data expired.`);
        }
        return data;
    } catch (error) {
        console.log("Error fetching cached weather data", error);
        throw error;
    }


};