import React from "react";
import "../../../../css/BackButton.css";
import { ArrowBack } from "@mui/icons-material";

const BackButton = props => {

    return (
        <div className="back-button" onClick={props.onClick}>
            <ArrowBack sx={{ color: "white" }} />
        </div>
    );
};

export default BackButton;