import React from "react";
import "./ViewWeatherCard.css";

import { ArrowBack } from "@mui/icons-material";

import { WEATHER_ICON_BASE_URL } from "../../constants/apiConstants";

import { getRandomHSLColor } from "../../utils/colorUtils";
import { getDateString, getTimeString } from "../../utils/dateUtils";
import { capitalizeEachWord } from "../../utils/stringUtils";
import ViewWeatherCardBottom from "./ViewWeatherCardBottom";


const ViewWeatherCard = props => {
    const city = props.weatherData;
    const date = new Date(city.dt * 1000);
    const iconUrl = `${WEATHER_ICON_BASE_URL}/${city.weather[0].icon}@2x.png`;

    const onClickBackHandler = (e) => {
        props.onClickBack(true);
    };

    return (
        <>
            <div className="view-weather-card__container"
                style={{ backgroundColor: getRandomHSLColor(city.name) }}>
                <div className="back-button" onClick={onClickBackHandler}>
                    <ArrowBack sx={{ color: "white" }} />
                </div>
                <section className="top-section">
                    <div>
                        <h2>{`${city.name}, ${city.sys.country}`}</h2>
                        <span>{`${getTimeString(date)}, ${getDateString(date)}`}</span>
                    </div>
                    <div>
                        <div className="view-weather-status">
                            <img src={iconUrl}></img>
                            <span>{`${capitalizeEachWord(city.weather[0].description)}`}</span>
                        </div>
                        <div className="view-temperature">
                            <h2>{`${Math.round(city.main.temp)}`}&#8451;</h2>
                            <p>{`Temp Min: ${Math.round(city.main.temp_min)}`}&#8451;</p>
                            <p>{`Temp Max: ${Math.round(city.main.temp_max)}`}&#8451;</p>
                        </div>
                    </div>
                </section>
                <ViewWeatherCardBottom
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

export default ViewWeatherCard;