import React, { useState } from "react";
import clear from "../assets/Images/clear.png";
import clouds from "../assets/Images/clouds.png";
import drizzle from "../assets/Images/drizzle.png";
import humidity from "../assets/Images/humidity.png";
import rain from "../assets/Images/rain.webp";
import snow from "../assets/Images/snow.png";
import thunder from "../assets/Images/thunder.png";
import wind2 from "../assets/Images/wind2.webp";

function CheckWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = "a9e63173c7d614e7772bcd54911b23c0"; 
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const getWeather = async () => {
    if (!city) return;
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (response.status === 404) {
        alert("City not found");
        return;
      }
      const data = await response.json();
      setWeather(data);
  };

  const getWeatherIcon = () => {
    if (!weather) return clouds;
    switch (weather.weather[0].main) {
      case "Clear":
        return clear;
      case "Rain":
        return rain;
      case "Drizzle":
        return drizzle;
      case "Snow":
        return snow;
      case "Thunderstorm":
        return thunder;
      case "Clouds":
        return clouds;
      default:
        return clouds;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  return (
    <div className="h-[100%] flex justify-center items-center ">
      <div className="w-[90%] sm:w-[500px] bg-linear-to-br from-teal-300 to-blue-900 backdrop-blur-md rounded-2xl p-6 shadow-lg h-[80%] mt-7">
        
        <div className="w-full flex justify-between items-center">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 outline-0 bg-white text-[#555] px-5 py-3 rounded-3xl flex-1 mr-3"
            type="text"
            placeholder="Enter city name..."
          />
          <button
            onClick={getWeather}
            className="bg-white text-gray-600 rounded-full w-[50px] h-[50px] flex justify-center items-center shadow-md"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>

        {/* Weather Data */}
        {weather && (
          <div className="mt-8 flex flex-col justify-center items-center">
            <img src={getWeatherIcon()} alt="weather icon" className="w-[230px]" />
            <h1 className="text-6xl font-bold text-white mt-7 ">
              {Math.round(weather.main.temp)}°C
            </h1>
            <div className="city text-3xl font-medium text-white mb-7">
              {weather.name}, {weather.sys.country}
            </div>

            <div className="details w-full grid grid-cols-2 gap-5 mt-6 text-white">
              <div className="flex justify-center items-center bg-white/20 rounded-xl p-4">
                <img
                  src={humidity}
                  alt="humidity"
                  className="w-[40px] mr-3"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <div>
                  <p className="text-xl ">{weather.main.humidity}%</p>
                  <p className="text-sm">Humidity</p>
                </div>
              </div>
              <div className="flex justify-center items-center bg-white/20 rounded-xl p-4">
                <img
                  src={wind2}
                  alt="wind"
                  className="w-[40px] mr-3"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <div>
                  <p className="text-xl mb-2">{Math.round(weather.wind.speed)} km/h</p>
                  <p className="text-sm">Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckWeather;