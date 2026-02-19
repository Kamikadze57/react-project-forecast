import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import WeatherStats from "./Components/WeatherStats/WeatherStats";
import WeatherChart from "./Components/WeatherChart/WeatherChart";
import WeeklyForecast from "./Components/WeeklyForecast/WeeklyForecast";

const DetailsPage = () => {
  const { cityName } = useParams();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`);
        setCurrentWeather(currentRes.data);

        // 2. Прогноз для графіка та списку на тиждень
        const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`);
        setForecast(forecastRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [cityName, apiKey]);

  if (!currentWeather || !forecast) return <p className="details-loading__text">Loading...</p>;

  return (
    <>
      <div className="container">
        <h2 className="details__title title">Weather in {currentWeather.name}</h2>
        <WeatherStats data={currentWeather} />
        <WeatherChart hourlyData={forecast.list.slice(0, 20)} />
        <WeeklyForecast forecastList={forecast.list} />
      </div>
    </>
  );
};

export default DetailsPage;
