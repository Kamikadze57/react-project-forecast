const WeatherCards = ({ baseUrl, cities, onDelete, onRefresh }) => {
  const formatDate = () => {
    const date = new Date();
    const today = date.toLocaleDateString("uk-UA");
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const weekday = date.toLocaleString("en-US", { weekday: "long" });
    return { date: `${month} ${day}`, weekday, today };
  };
  console.log(cities);
  const { weekday, today } = formatDate();

  return (
    <section className="weather-cards">
      <div className="container">
        <ul className="weather-cards__list">
          {cities.map((city) => (
            <li key={city.id} className="weather-cards__item">
              <div className="cards-header__box">
                <p className="cards__text">{city.name}</p>
                <p className="cards__text">{city.sys.country}</p>
              </div>

              <div className="cards-body__box">
                <p className="cards__text cards__time">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                <button className="cards-hourly-forecast__btn button">Hourly forecast</button>

                <div className="cards-time__box">
                  <p className="cards__text cards__date">{today}</p>
                  <p className="cards__text cards__day">{weekday}</p>
                </div>

                <img
                  className="cards-weather__img"
                  src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`}
                  alt={city.weather[0].description}
                />
                <p className="cards__text cards__temperature">{Math.round(city.main.temp)}°C</p>
              </div>

              <div className="cards-footer__box">
                <button className="cards-svg__btn" onClick={() => onRefresh(city.id, city.name)}>
                  <svg className="cards__svg">
                    <use href={`${baseUrl}/icons.svg#refresh`}></use>
                  </svg>
                </button>
                <button className="cards-svg__btn">
                  <svg className="cards__svg">
                    <use href={`${baseUrl}/icons.svg#save`}></use>
                  </svg>
                </button>
                <button className="cards__btn button">See more</button>
                <button className="cards-svg__btn" onClick={() => onDelete(city.id)}>
                  <svg className="cards__svg">
                    <use href={`${baseUrl}/icons.svg#delete`}></use>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WeatherCards;
