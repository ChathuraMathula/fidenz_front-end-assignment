import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import "../../../css/WeatherContainer.css";
import ViewWeatherCard from "./ViewWeatherCard";

const WeatherContainer = (props) => {

    const [cityWeatherData, setCityWeatherData] = useState({});
    const [isViewing, setIsViewing] = useState(false);

    const onClickWeatherCardHandler = (cityName) => {
        const extractedCityWeatherData = props.weatherInfo?.list.filter(city => {
            return city.name === cityName;
        });
        setCityWeatherData({ ...extractedCityWeatherData[0] });
        setIsViewing(true);
    };

    const onClickBackhandler = (hasBackClicked) => {
        if (hasBackClicked) {
            setIsViewing(false);
        }
    };

    return (
        <>
            {
                !isViewing && props.weatherInfo?.list
                    ? props.weatherInfo.list.map((listItem, i) => {
                        return (
                            <>
                                <WeatherCard city={listItem}
                                    onClickWeatherCard={onClickWeatherCardHandler} />
                            </>
                        );
                    })
                    : isViewing && cityWeatherData.name
                        ? <>
                            <ViewWeatherCard weatherData={cityWeatherData} 
                                onClickBack={onClickBackhandler} />
                        </>
                        : null
            }
        </>
    );
};

export default WeatherContainer;