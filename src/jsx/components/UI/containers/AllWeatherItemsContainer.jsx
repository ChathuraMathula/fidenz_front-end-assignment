import React from "react";
import WeatherCard from "../cards/weather_card/WeatherCard";
import { useNavigate } from "react-router-dom";

const AllWeatherItemsContainer = (props) => {

    const navigate = useNavigate();

    const onClickWeatherCardHandler = (cityName) => {
        const cityWeatherPath = `/view?city=${cityName}`;
        navigate(cityWeatherPath, { replace: true });
    };

    return (
        <>
            {
                props.weatherData.list.map((listItem, i) => {
                    return (
                        <WeatherCard
                            key={listItem.name}
                            city={listItem}
                            onClickWeatherCard={onClickWeatherCardHandler}
                        />
                    );
                })
            }
        </>
    );
};

export default AllWeatherItemsContainer;