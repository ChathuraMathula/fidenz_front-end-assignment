import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "../constants/constants";


const fetchWeatherDataByCityCodes = async (cityCodes) => {

    if (cityCodes?.length > 0) {
        try {
            const cityCodesString = cityCodes.join();

            const weatherApiUrl = `${WEATHER_API_BASE_URL}?id=${cityCodesString}&units=metric&appid=${WEATHER_API_KEY}`;
            
            const response = await fetch(weatherApiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
            }

            const weatherData = response.json();
            return weatherData;

        } catch (error) {
            throw error;
        }
    }

};

export default fetchWeatherDataByCityCodes;