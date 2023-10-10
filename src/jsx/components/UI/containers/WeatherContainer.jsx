import React, { useState } from "react";
import WeatherCard from "../cards/weather_card/WeatherCard";
import "../../../../css/WeatherContainer.css";
import ViewWeatherCard from "../cards/view_weather_card/ViewWeatherCard.jsx";

const WeatherContainer = (props) => {

    const [cityWeatherData, setCityWeatherData] = useState({});
    const [isViewing, setIsViewing] = useState(false);

    const onClickWeatherCardHandler = (cityName) => {
        const extractedCityWeatherData = props.weatherData?.list.filter(city => {
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
                !isViewing && props.weatherData?.list
                    ? props.weatherData.list.map((listItem, i) => {
                        return (
                            <WeatherCard
                                city={listItem}
                                onClickWeatherCard={onClickWeatherCardHandler}
                            />
                        );
                    })
                    : isViewing && cityWeatherData.name
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