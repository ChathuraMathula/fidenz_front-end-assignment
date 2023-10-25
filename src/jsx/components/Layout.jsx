import React from "react";
import AppHeader from "./header/AppHeader";
import MainContainer from "./UI/containers/MainContainer";
import { Outlet } from "react-router-dom";
import AppFooter from "./footer/AppFooter";
import ErrorMessage from "./UI/other/ErrorMessage";
import LoadingSpinner from "./UI/other/LoadingSpinner";

const Layout = (props) => {
    return (
        <>
            <AppHeader />
            <MainContainer>
                {
                    props.error
                    ? <ErrorMessage error={props.error} />
                    : props.isLoading
                        ? <LoadingSpinner />
                        : <Outlet />
                }
            </MainContainer>
            <AppFooter />
        </>
    );
};

export default Layout;