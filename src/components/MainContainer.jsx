import React from "react";
import WeatherCard from "./WeatherCard";
import "./MainContainer.css";

const MainContainer = (props) => {
    return (
        <div className="main-container">
            {
                props.weatherInfo?.list ?
                    props.weatherInfo.list.map((listItem, i) => {
                        return (
                            <>
                                <WeatherCard city={listItem} />
                            </>
                        );
                    }) : null
            }
        </div>
    );
};

export default MainContainer;