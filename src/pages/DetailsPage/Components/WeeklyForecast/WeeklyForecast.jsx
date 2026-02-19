const WeeklyForecast = ({ forecastList }) => {
  const dailyData = forecastList.filter((item) => item.dt_txt.includes("12:00:00"));

  return (
    <section className="weekly-forecast">
      <h3 className="weekly__title">5-Day Forecast</h3>
      <ul className="weekly__list">
        {dailyData.map((day, index) => (
          <li key={index} className="weekly__item">
            <p className="weekly__day">{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}</p>

            <div className="weekly-item__box">
              <img
                className="weekly__icon"
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <p className="weekly__temp">
                {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
              </p>
            </div>
            <p className="weekly__desc">{day.weather[0].main}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WeeklyForecast;
