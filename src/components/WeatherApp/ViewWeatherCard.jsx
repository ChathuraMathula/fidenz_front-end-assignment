import React from "react";
import "./ViewWeatherCard.css";

import utils from "../../utils/utils.js";
import WeatherCardBottom from "./WeatherCardBottom";
import { ArrowBack } from "@mui/icons-material";


const ViewWeatherCard = props => {
    const city = props.weatherData;
    const date = new Date(city.dt * 1000);
    const iconUrl = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;

    const onClickBackHandler = (e) => {
        props.onClickBack(true);
    };

    return (
        <>
            <div className="view-weather-card__container"
                style={{ backgroundColor: utils.getRandomHSLColor(city.name) }}>
                <div className="back-button" onClick={onClickBackHandler}>
                    <ArrowBack sx={{ color: "white" }} />
                </div>
                <section className="top-section">
                    <div>
                        <h2>{`${city.name}, ${city.sys.country}`}</h2>
                        <span>{`${utils.getTimeString(date)}, ${utils.getDateString(date)}`}</span>
                    </div>
                    <div>
                        <div className="view-weather-status">
                            <img src={iconUrl}></img>
                            <span>{`${utils.capitalizeEachWord(city.weather[0].description)}`}</span>
                        </div>
                        <div className="view-temperature">
                            <h2>{`${Math.round(city.main.temp)}`}&#8451;</h2>
                            <p>{`Temp Min: ${Math.round(city.main.temp_min)}`}&#8451;</p>
                            <p>{`Temp Max: ${Math.round(city.main.temp_max)}`}&#8451;</p>
                        </div>
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

export default ViewWeatherCard;