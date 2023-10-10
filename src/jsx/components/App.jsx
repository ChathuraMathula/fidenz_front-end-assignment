import { useEffect, useState } from 'react'
import '../../css/App.css';
import cities from "../../json/cities.json";
import { fetchCachedWeatherData, cacheWeatherData } from '../../js/helpers/localStorageHelpers';
import fetchWeatherDataByCityCodes from '../../js/helpers/apiHelpers';
import AppHeader from './WeatherApp/AppHeader';
import AppFooter from './WeatherApp/AppFooter';
import ErrorMessage from './WeatherApp/ErrorMessage';
import WaitMessage from './WeatherApp/WaitMessage';
import WeatherContainer from './WeatherApp/WeatherContainer';
import MainContainer from './WeatherApp/MainContainer';


function App() {

  const [cityCodes, setCityCodes] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({});
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
          setWeatherInfo({ ...latestWeatherData });
          setIsLoading(false);
          setError(false);
        })
        .catch(error => {
          if (error) {
            setError(error.message);
          }
        });

    } else {
      setWeatherInfo({ ...cachedWeatherData });
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
              : <WeatherContainer weatherInfo={weatherInfo} />
        }
      </MainContainer>
      <AppFooter />
    </>
  );



}

export default App
