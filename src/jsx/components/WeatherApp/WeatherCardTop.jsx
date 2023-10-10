import React from "react";
import "../../../css/WeatherCardTop.css";

import { getDateString, getTimeString } from "../../../js/utils/dateUtils";
import { capitalizeEachWord } from "../../../js/utils/stringUtils";

import { WEATHER_ICON_BASE_URL } from "../../../js/constants/constants";

const WeatherCardTop = props => {

    const iconUrl = `${WEATHER_ICON_BASE_URL}/${props.weatherIconName}@2x.png`;

    return (
        <section className="section01">
            <div>
                <h2>{`${props.cityName}, ${props.country}`}</h2>
                <span className="updated-time">{`${getTimeString(props.date)}, ${getDateString(props.date)}`}</span>
                <div className="weather-status">
                    <img src={iconUrl}></img>
                    <span>{`${capitalizeEachWord(props.weatherDescription)}`}</span>
                </div>
            </div>
            <div className="temperature">
                <h2>{`${Math.round(props.temperature)}`}&#8451;</h2>
                <p>{`Temp Min: ${Math.round(props.minimumTemperature)}`}&#8451;</p>
                <p>{`Temp Max: ${Math.round(props.maximumTemperature)}`}&#8451;</p>
            </div>
        </section>
    );
};

export default WeatherCardTop;