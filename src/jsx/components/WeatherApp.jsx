import { useEffect, useState } from 'react'
import '../../css/App.css';

import cities from "../../json/cities.json";

import {
  fetchCachedWeatherData,
  cacheWeatherData
} from '../../js/helpers/localStorageHelpers';
import fetchWeatherDataByCityCodes from '../../js/helpers/apiHelpers';

import AppHeader from './header/AppHeader';
import AppFooter from './footer/AppFooter';
import ErrorMessage from './UI/other/ErrorMessage';
import WaitMessage from './UI/other/WaitMessage';
import WeatherContainer from './UI/containers/WeatherContainer';
import MainContainer from './UI/containers/MainContainer';


function WeatherApp() {

  const [cityCodes, setCityCodes] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const cityCodesArray = [];
    cities.List.forEach(city => (cityCodesArray.push(city.CityCode)))
    setCityCodes([...cityCodesArray]);
  }, []);

  useEffect(() => {
    if (cityCodes.length > 0) {
      fetchWeatherData();
    }
  }, [cityCodes]);


  const fetchWeatherData = async () => {

    let cachedWeatherData = fetchCachedWeatherData();

    if (!cachedWeatherData) {
      setIsLoading(true);
      await fetchWeatherDataByCityCodes(cityCodes)
        .then(latestWeatherData => {
          cacheWeatherData(latestWeatherData);
          setWeatherData({ ...latestWeatherData });
          setIsLoading(false);
          setError(false);
        })
        .catch(error => {
          if (error) {
            setError(error.message);
          }
        });

    } else {
      setWeatherData({ ...cachedWeatherData });
      setIsLoading(false);
      setError(false);
    }

  };

  return (
    <>
      <AppHeader />
      <MainContainer>
        {
          error
            ? <ErrorMessage error={error} />
            : isLoading
              ? <WaitMessage />
              : <WeatherContainer weatherData={weatherData} />
        }
      </MainContainer>
      <AppFooter />
    </>
  );



}

export default WeatherApp
