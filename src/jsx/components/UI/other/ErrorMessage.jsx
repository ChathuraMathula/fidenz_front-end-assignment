import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const ErrorMessage = props => {

    return (
        <Alert severity='error' >
            <AlertTitle>{props.error}</AlertTitle>
        </Alert >
    );
};

export default ErrorMessage;