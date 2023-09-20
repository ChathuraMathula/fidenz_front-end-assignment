import React from "react";
import wind_direction_icon from "../assets/wind_direction.png";
import "./WeatherCard.css";

const WeatherCard = (props) => {

    const city = props.city;
    const date = new Date(city.dt * 1000);
    const iconUrl = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;

    const getDateString = (date) => {
        const dateArray = date.toDateString().split(" ");
        const month = dateArray[1];
        const day = dateArray[2];
        return `${month} ${day}`
    };

    const getTimeString = (date) => {
        const timeString = date.toLocaleTimeString();
        const ampm = timeString.substr(-2) == "AM"
            ? "am"
            : timeString.substr(-2) == "PM"
                ? "pm"
                : null;
        const timeArray = timeString.split(":");
        const time = `${timeArray[0]}.${timeArray[1]}${ampm}`;
        return time;
    }

    const capitalizeEachWord = (str) => {
        const words = str.split(" ");
        const capitalizedWords = [];
        words.forEach(word => {
            const letters = word.split("");
            letters[0] = letters[0].toUpperCase();
            capitalizedWords.push(letters.join(""));
        });
        return capitalizedWords.join(" ").trim();
    }

    const getRandomHSLColor = (str) => {
        const num = (str.split("").reduce((acc, curr) => {
            return acc + curr.charCodeAt(0);
        }, 0) % 300);

        return `hsl(${num}, 80%, 30%)`;
    };

    return (
        <>
            <div key={city.name} className="weather-card__container"
                    style={{ backgroundColor: getRandomHSLColor(city.name) }}>
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
                <section className="section02">
                    <div>
                        <p><span>Pressure:</span>{` ${city.main.pressure}hPa`}</p>
                        <p><span>Humidity:</span>{` ${city.main.humidity}%`}</p>
                        <p><span>Visibility:</span>{` ${(city.visibility / 1000).toFixed(1)}km`}</p>
                    </div>
                    <div>
                        <img src={wind_direction_icon} alt="wind_direction_icon"></img>
                        <p>{`${city.wind.speed.toFixed(1)}m/s ${city.wind.deg} Degree`}</p>
                    </div>
                    <div>
                        <p><span>Sunrise:</span>{` ${getTimeString(new Date(city.sys.sunrise * 1000))}`}</p>
                        <p><span>Sunset:</span>{` ${getTimeString(new Date(city.sys.sunset * 1000))}`}</p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default WeatherCard;