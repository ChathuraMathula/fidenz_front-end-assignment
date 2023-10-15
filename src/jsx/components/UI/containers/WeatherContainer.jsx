import React, { useEffect, useState } from "react";
import WeatherCard from "../cards/weather_card/WeatherCard";
import "../../../../css/WeatherContainer.css";
import ViewWeatherCard from "../cards/view_weather_card/ViewWeatherCard.jsx";
import { cacheCityName, getCachedCityName, removeCachedCityName } from "../../../../js/helpers/localStorageHelpers";

const WeatherContainer = (props) => {

    const [cityWeatherData, setCityWeatherData] = useState({});
    const [isViewingCityWeatherData, setIsViewingCityWeatherData] = useState(false);

    useEffect(() => {
        const cityName = getCachedCityName();
        if (!cityName) {
            return;
        }

        onClickWeatherCardHandler(cityName);
    }, []);

    const extractWeatherDataByCityName = (cityName) => {
        const extractedCityWeatherData = props.weatherData?.list.filter(city => {
            return city.name === cityName;
        });

        return extractedCityWeatherData;
    };

    const onClickWeatherCardHandler = (cityName) => {
        const extractedCityWeatherData = extractWeatherDataByCityName(cityName);
        setCityWeatherData({ ...extractedCityWeatherData[0] });
        cacheCityName(cityName);
        setIsViewingCityWeatherData(true);
    };

    const onClickBackhandler = (hasBackClicked) => {
        if (hasBackClicked) {
            removeCachedCityName();
            setIsViewingCityWeatherData(false);
        }
    };

    return (
        <>
            {
                !isViewingCityWeatherData
                    ? props.weatherData.list.map((listItem, i) => {
                        return (
                            <WeatherCard
                                city={listItem}
                                onClickWeatherCard={onClickWeatherCardHandler}
                            />
                        );
                    })
                    : isViewingCityWeatherData
                        ?
                        <ViewWeatherCard
                            weatherData={cityWeatherData}
                            onClickBack={onClickBackhandler}
                        />
                        : null
            }
        </>
    );
};

export default WeatherContainer;