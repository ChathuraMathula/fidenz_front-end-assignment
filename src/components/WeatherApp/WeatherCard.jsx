import React from "react";
import "./WeatherCard.css";

import WeatherCardBottom from "./WeatherCardBottom";

import { WEATHER_ICON_BASE_URL } from "../../constants/apiConstants";

import { getRandomHSLColor } from "../../utils/colorUtils";
import { getDateString, getTimeString } from "../../utils/dateUtils";
import { capitalizeEachWord } from "../../utils/stringUtils";

const WeatherCard = (props) => {

    const city = props.city;
    const date = new Date(city.dt * 1000);
    const iconUrl = `${WEATHER_ICON_BASE_URL}/${city.weather[0].icon}@2x.png`;

    const onClicWeatherCardkHandler = (cityName) => {
        props.onClickWeatherCard(cityName);
    }

    return (
        <>
            <div key={city.name} className="weather-card__container"
                style={{ backgroundColor: getRandomHSLColor(city.name) }}
                onClick={() => onClicWeatherCardkHandler(city.name)}>
                <section className="section01">
                    <div>
                        <h2>{`${city.name}, ${city.sys.country}`}</h2>
                        <span className="updated-time">{`${getTimeString(date)}, ${getDateString(date)}`}</span>
                        <div className="weather-status">
                            <img src={iconUrl}></img>
                            <span>{`${capitalizeEachWord(city.weather[0].description)}`}</span>
                        </div>
                    </div>
                    <div className="temperature">
                        <h2>{`${Math.round(city.main.temp)}`}&#8451;</h2>
                        <p>{`Temp Min: ${Math.round(city.main.temp_min)}`}&#8451;</p>
                        <p>{`Temp Max: ${Math.round(city.main.temp_max)}`}&#8451;</p>
                    </div>
                </section>
                <WeatherCardBottom
                    pressure={city.main.pressure}
                    humidity={city.main.humidity}
                    visibility={city.visibility}
                    wind={city.wind}
                    sunrise={city.sys.sunrise}
                    sunset={city.sys.sunset}
                />
            </div>
        </>
    );
};

export default WeatherCard;