import React from "react";
import { CircularProgress } from "@mui/material";
import "../../../../css/LoadingSpinner.css";

const LoadingSpinner = props => {

    return (
        <div className="wait-message">
            <CircularProgress style={{ color: "white" }} />
            <span>Please wait...</span>
        </div>
    );
};

export default LoadingSpinner;