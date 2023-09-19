import { useEffect, useState } from 'react'
import './App.css'
import cities from "./resources/cities.json";
import WeatherAPI from './keys/WeatherAPI';

function App() {

  const [cityCodes, setCityCodes] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    const cityCodesArray = [];
    cities.List.forEach(city => (cityCodesArray.push(city.CityCode)))
    setCityCodes([...cityCodesArray]);
  }, []);

  useEffect(() => {
    const cityCodesString = cityCodes.join(",");

    const apiUrl = `https://api.openweathermap.org/data/2.5/group?
      id=${cityCodesString}&units=metric&appid=${WeatherAPI.key}`;

    fetch(apiUrl)
      .then(res => (res.json()))
      .then(res => {
        setWeatherInfo({ ...res });
      })
  }, [cityCodes]);

  return (
    <>
      <div>

      </div>
    </>
  )
}

export default App
