// Weather.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("Paris");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cityChanged = () => {
    const cityName = document.getElementById("city-input").value;
    setCity(cityName);
  };

  useEffect(() => {
    const apiKey = "cd0e20963bfe58c44b421bf75093bcdb";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        const temp = (data.main.temp - 273.15).toFixed(1);
        const description = data.weather[0].description;
        setWeatherData({ temp, description });
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [city]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <div className="data-container">
        <div className="input-container">
          <input
            className="city-input"
            type="text"
            id="city-input"
            placeholder="Enter city name"
          />
          <button className="btn-1" onClick={cityChanged}>
            Get Weather
          </button>
        </div>
        <div className="text-container">
          <h2>{city}</h2>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Description: {weatherData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
