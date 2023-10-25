import { useEffect, useState } from 'react'
import '../../css/App.css';

import cities from "../../json/cities.json";

import { fetchCachedWeatherData, cacheWeatherData } from '../../js/helpers/localStorageHelpers';
import fetchWeatherDataByCityCodes from '../../js/helpers/apiHelpers';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import AllWeatherItemsContainer from './UI/containers/AllWeatherItemsContainer';
import SingleWeatherItemContainer from './UI/containers/SingleWeatherItemContainer';


function WeatherApp() {

  const [cityCodes, setCityCodes] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const cityCodesArray = [];
    cities.List.forEach(city => (cityCodesArray.push(city.CityCode)))
    setCityCodes([...cityCodesArray]);

    console.log("testing");
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
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout error={error} isLoading={isLoading} />}>
          <Route
            path=''
            element={<AllWeatherItemsContainer weatherData={weatherData} />}
          />
          <Route
            path='/view'
            element={<SingleWeatherItemContainer weatherData={weatherData}/>}
          />
          <Route path='*' element={<>404</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );



}

export default WeatherApp
