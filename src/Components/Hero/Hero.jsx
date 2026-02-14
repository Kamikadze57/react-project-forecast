import { useState, useEffect } from "react";
import axios from "axios";

const Hero = ({ baseUrl, onCityFound }) => {
  const formatDate = () => {
    const month = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });
    const weekday = new Date().toLocaleString("en-US", { weekday: "long" }) + ", " + new Date().getDate();
    return { month, weekday };
  };

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const fetchSuggestions = async (query) => {
    // Менше 3 збігів - не відображати нічого
    if (query.length < 3) {
      setSuggestions([]);
      setError("");
      return;
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
      if (response.data.length === 0) {
        setError("Міст не знайдено");
        setSuggestions([]);
      } else {
        setError("");
        setSuggestions(response.data);
      }
    } catch (error) {
      console.error("Geo API Error:", error);
    }
  };

  useEffect(() => {
    // Затримка для антиспаму на API
    const citiesTimer = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 500);
    return () => clearTimeout(citiesTimer);
  }, [searchQuery]);

  const handleSelectCity = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
      onCityFound(response.data);
      setSearchQuery("");
      setSuggestions([]);
    } catch (err) {
      console.error("Weather API Error:", err);
    }
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Є список - вибирається перший варіант
    if (suggestions.length > 0) {
      const firstCity = suggestions[0];
      handleSelectCity(firstCity.lat, firstCity.lon);
    }
  };

  const isDropdownActive = suggestions.length > 0 || error;
  const { month, weekday } = formatDate();

  return (
    <section className="hero">
      <div className="container hero__container">
        <h1 className="hero__title">Weather dashboard</h1>
        <div className="hero__box">
          <h2 className="hero__subtitle">Create your personal list of favorite cities and always be aware of the weather.</h2>
          <p className="hero__subtitle">
            {month}
            <br />
            {weekday}
            <sup className="hero-subtitle__sup">th</sup>
          </p>
        </div>
        <div className="hero-search__box">
          <form className="hero-search__form" onSubmit={handleSearchSubmit}>
            <input
              className={`hero-search__input input ${isDropdownActive ? "suggested" : ""}`}
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={`hero-search__btn button ${isDropdownActive ? "suggested" : ""}`}>
              <svg className="hero-search__svg">
                <use href={`${baseUrl}/icons.svg#search`}></use>
              </svg>
            </button>
          </form>
          {isDropdownActive && (
            <div className="hero-search__dropdown">
              {error && <p className="hero-search-error__text">{error}</p>}
              {suggestions.length > 0 && (
                <ul className="hero-suggestions__list">
                  {suggestions.map((city, index) => (
                    <li
                      key={`${city.lat}-${city.lon}-${index}`}
                      className="hero-suggestions__item"
                      onClick={() => handleSelectCity(city.lat, city.lon)}
                    >
                      <span className="hero-city__name">
                        {city.name}, {city.state && `${city.state}, `}
                        {city.country}
                      </span>
                      <button className="hero-suggestions__btn button">
                        <svg className="hero-suggestions__svg">
                          <use href={`${baseUrl}/icons.svg#search`}></use>
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
