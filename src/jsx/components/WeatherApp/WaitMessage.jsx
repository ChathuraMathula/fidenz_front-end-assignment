import React from "react";
import { CircularProgress } from "@mui/material";
import "../../../css/WaitMessage.css";

const WaitMessage = props => {

    return (
        <div className="wait-message">
            <CircularProgress style={{ color: "white" }} />
            <span>Please wait...</span>
        </div>
    );
};

export default WaitMessage;