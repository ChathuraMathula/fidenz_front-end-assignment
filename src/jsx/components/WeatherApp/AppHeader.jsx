import React from "react";
import weatherAppIcon from "../../../images/weather_app_icon.png";
import { APP_HEADING } from "../../../js/constants/constants";

import "../../../css/AppHeader.css";

const AppHeader = props => {

    const onClickHeadingHandler = (event) => {
        window.location.reload(true);
    }

    return (
        <h1 className='weather-app__heading' onClick={onClickHeadingHandler}>
            <img src={weatherAppIcon} alt='weather app icon'></img>
            <span>{APP_HEADING}</span>
        </h1>
    );
};

export default AppHeader;