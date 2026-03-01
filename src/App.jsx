import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import News from "./Components/News/News";
import Gallery from "./Components/Gallery/Gallery";
import Footer from "./Components/Footer/Footer";
import WeatherCards from "./Components/WeatherCards/WeatherCards";

import DetailsPage from "./pages/DetailsPage/DetailsPage";

function App() {
  const baseUrl = import.meta.env.BASE_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const [isVisible, setIsVisible] = useState(false);
  const [cities, setCities] = useState([]);

  // Запит до API
  const getCityWeather = async (name) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiKey}`;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.log("Помилка при завантаженні:", name);
      return null;
    }
  };

  // Завантаження при старті
  useEffect(() => {
    const saved = localStorage.getItem("weatherCities");
    if (saved) {
      setCities(JSON.parse(saved));
    } else {
      const loadDefaults = async () => {
        const city1 = await getCityWeather("Kyiv");
        const city2 = await getCityWeather("London");
        const city3 = await getCityWeather("New York");

        const defaultCities = [city1, city2, city3].filter((c) => c !== null);
        setCities(defaultCities);
        localStorage.setItem("weatherCities", JSON.stringify(defaultCities));
      };
      loadDefaults();
    }
  }, []);

  // Додавання міста
  const addNewCity = (newCity) => {
    const exists = cities.find((c) => c.id === newCity.id);
    if (exists) return;
    const newItems = [newCity, ...cities];

    if (newItems.length > 3) {
      newItems.pop();
    }

    setCities(newItems);
    localStorage.setItem("weatherCities", JSON.stringify(newItems));
  };

  const deleteCity = async (id) => {
    const updated = cities.filter((c) => c.id !== id);

    // Список міст на заміну
    const pool = ["Paris", "Tokyo", "Berlin", "Kyiv", "London"];

    // Пошук першого підходящого міста з пулу
    let nameToFill = "";
    for (let name of pool) {
      const isAlreadyShowing = updated.some((c) => c.name === name);
      if (!isAlreadyShowing) {
        nameToFill = name;
        break;
      }
    }

    // Завантаження заміни
    const replacement = await getCityWeather(nameToFill);
    if (replacement) {
      const final = [...updated, replacement];
      setCities(final);
      localStorage.setItem("weatherCities", JSON.stringify(final));
    } else {
      setCities(updated);
    }
  };

  // Оновлення по кнопці
  const refreshCity = async (id, cityName) => {
    const freshData = await getCityWeather(cityName);
    if (freshData) {
      const newCities = cities.map((c) => {
        if (c.id === id) return freshData;
        return c;
      });
      setCities(newCities);
    }
  };

  // Прокрутка вверх
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <BrowserRouter basename="/react-project-forecast">
        <Header baseUrl={baseUrl} />
        <main>
          <Routes>
            {/* Головна сторінка */}
            <Route
              path="/"
              element={
                <>
                  <Hero baseUrl={baseUrl} onCityFound={addNewCity} />
                  <WeatherCards baseUrl={baseUrl} cities={cities} onDelete={deleteCity} onRefresh={refreshCity} />
                  <News />
                  <Gallery />
                </>
              }
            />

            {/* Сторінка з подробним прогнозом */}
            <Route
              path="/details/:cityName"
              element={
                <>
                  <Hero baseUrl={baseUrl} onCityFound={addNewCity} />
                  <WeatherCards baseUrl={baseUrl} cities={cities} onDelete={deleteCity} onRefresh={refreshCity} />
                  <DetailsPage />
                  <News />
                  <Gallery />
                </>
              }
            />
          </Routes>
        </main>
        {isVisible && (
          <button className="scroll-to-top__btn button" onClick={scrollToTop}>
            ↑
          </button>
        )}
        <Footer baseUrl={baseUrl} />
      </BrowserRouter>
    </>
  );
}

export default App;
