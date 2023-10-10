import React from "react";

import "../../../css/MainContainer.css";

const MainContainer = props => {

    return (
        <main className="main-container">
            {props.children}
        </main>
    );
};

export default MainContainer;