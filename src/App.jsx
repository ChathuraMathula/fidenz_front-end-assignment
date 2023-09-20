import { useEffect, useState } from 'react'
import './App.css'
import cities from "./resources/cities.json";
import WeatherAPI from './keys/WeatherAPI';
import MainContainer from './components/MainContainer';
import weatherAppIcon from "./assets/weather_app_icon.png";

function App() {

  const [cityCodes, setCityCodes] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    const cityCodesArray = [];
    cities.List.forEach(city => (cityCodesArray.push(city.CityCode)))
    setCityCodes([...cityCodesArray]);
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [cityCodes]);


  const cacheWeatherData = (data) => {
    const timespan = Date.now();
    const cachedData = {
      data: data,
      timespan: timespan,
    };

    localStorage.setItem("weatherData", JSON.stringify(cachedData));
  };

  const getCachedWeatherData = () => {
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

  const getWeatherData = async () => {
    let weatherData = getCachedWeatherData();

    if (!weatherData) {
      if (cityCodes.length > 0) {
        const cityCodesString = cityCodes.join(",");

        const apiUrl =
          `https://api.openweathermap.org/data/2.5/group?id=${cityCodesString}&units=metric&appid=${WeatherAPI.key}`;

        weatherData = await fetch(apiUrl).then(res => (res.json()));
        cacheWeatherData({ ...weatherData })
      }
    }

    setWeatherInfo({ ...weatherData });
  };

  return (
    <>
      <h1 className='weather-app__heading'>
        <img src={weatherAppIcon} alt='weather app icon'></img>
        <span>Weather App</span>
      </h1>
      <MainContainer weatherInfo={weatherInfo} />
      <footer className='weather-app__footer'>
        <p>2023 Fidenz Technologies.</p>
      </footer>
    </>
  );



}

export default App
