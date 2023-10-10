import React from "react";
import "../../../css/AppFooter.css";
import { FOOTER_DESCRIPTION } from "../../../js/constants/constants";

const AppFooter = props => {
    return (
        <footer className='weather-app__footer'>
            <p>{FOOTER_DESCRIPTION}</p>
        </footer>
    );
};

export default AppFooter;