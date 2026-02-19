import { WiThermometer, WiSunrise, WiHumidity, WiBarometer, WiStrongWind, WiDayFog } from "react-icons/wi";

const WeatherStats = ({ data }) => {
  const stats = [
    { label: "Feels like", value: `${Math.round(data.main.feels_like)}°C`, icon: <WiThermometer /> },
    { label: "Min / Max", value: `${Math.round(data.main.temp_min)}° / ${Math.round(data.main.temp_max)}°`, icon: <WiSunrise /> },
    { label: "Humidity", value: `${data.main.humidity}%`, icon: <WiHumidity /> },
    { label: "Pressure", value: `${data.main.pressure} hPa`, icon: <WiBarometer /> },
    { label: "Wind speed", value: `${data.wind.speed} m/s`, icon: <WiStrongWind /> },
    { label: "Visibility", value: `${(data.visibility / 1000).toFixed(1)} km`, icon: <WiDayFog /> },
  ];

  return (
    <section className="weather-stats">
        <ul className="stats__list">
          {stats.map((item, index) => (
            <li key={index} className="stats__item">
              <p className="stats__label">{item.label}</p>
              <p className="stats__value">{item.value}</p>
              <div className="stats__icon">{item.icon}</div>
            </li>
          ))}
        </ul>
    </section>
  );
};

export default WeatherStats;
