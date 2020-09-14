import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Weather = ({ city }) => {
    const [weather, setWeather] = useState({})
    const accessKey = process.env.REACT_APP_API_KEY.trim()
    const url = 'http://api.weatherstack.com/current'
    // console.log(weather);
    useEffect(() => {
        axios.get(url, {
            params: {
                access_key: accessKey,
                query: city
            }
        })
            .then(response => {
                // console.log(response);
                setWeather(response.data)
            })
            .catch(e => {
                console.log('error:', e);
            })
    }, [url, setWeather, accessKey, city])
    return (
        <div>
            <h3>Weather in {city}</h3>
            {weather.current === undefined
                ? <div></div>
                : <div>
                    <div>temperature: {weather.current.temperature} Celcius</div>
                    <img src={weather.current.weather_icons[0]} 
                        alt={`${city} weather Icon`} />
                    <div>wind: {weather.current.wind_speed} mph 
                        direction {weather.current.wind_dir}</div>
                  </div>
            }
        </div>
    );
};

export default Weather;