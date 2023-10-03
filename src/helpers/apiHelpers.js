import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "../constants/apiConstants";

/**
 * 
 * @param {Array<number>} cityCodes 
 */
const fetchWeatherDataByCityCodes = async (cityCodes) => {

    try {
        const cityCodesString = cityCodes.join(",");

        const response = await fetch(
            `${WEATHER_API_BASE_URL}?id=${cityCodesString}&units=metric&appid=${WEATHER_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const weatherData = response.json();
        return weatherData;

    } catch (error) {
        console.log("Error fetching weather data", error);
        throw error;
    }

};

export default fetchWeatherDataByCityCodes;