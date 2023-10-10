import { useEffect, useState } from 'react'
import '../css/App.css';
import cities from "../json/cities.json";
import MainContainer from './components/WeatherApp/MainContainer';
import weatherAppIcon from "../images/weather_app_icon.png";
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { fetchCachedWeatherData, cacheWeatherData } from '../js/helpers/localStorageHelpers';
import fetchWeatherDataByCityCodes from '../js/helpers/apiHelpers';


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


  const onClickHeadingHandler = (event) => {
    window.location.reload(true);
  }

  return (
    <>
      <h1 className='weather-app__heading' onClick={onClickHeadingHandler}>
        <img src={weatherAppIcon} alt='weather app icon'></img>
        <span>Weather App</span>
      </h1>
      <>
        {
          error
            ? <div className='loading-div'>
              <Alert severity='error'>
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            </div>
            : isLoading
              ? <div className='loading-div'>
                <CircularProgress style={{ color: "white" }} />
                <span>Please wait...</span>
              </div>
              : <MainContainer weatherInfo={weatherInfo} />
        }
      </>

      <footer className='weather-app__footer'>
        <p>2023 Fidenz Technologies.</p>
      </footer>
    </>
  );



}

export default App
