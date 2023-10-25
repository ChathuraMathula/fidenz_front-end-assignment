import React, { useEffect, useState } from "react";
import ViewWeatherCard from "../cards/view_weather_card/ViewWeatherCard";
import { useNavigate, useSearchParams } from "react-router-dom";

const SingleWeatherItemContainer = ({ weatherData }) => {

    const [searchParams] = useSearchParams();
    const [cityWeatherData, setCityWeatherData] = useState({});
    const navigate = useNavigate();

    const cityName = searchParams.get("city");

    useEffect(() => {

        const extractedCityWeatherData = weatherData?.list.filter(city => {
            return city.name === cityName;
        });

        if (extractedCityWeatherData.length == 0) {
            navigate("/", { replace: true });
        }

        setCityWeatherData({ ...extractedCityWeatherData[0] });
    }, []);


    const onClickBackhandler = () => {
        navigate("/", { replace: true });
    };

    if (cityWeatherData?.name) {
        return (
            <>
                <ViewWeatherCard
                    city={cityWeatherData}
                    onClickBack={onClickBackhandler}
                />
            </>
        );
    }
};

export default SingleWeatherItemContainer;