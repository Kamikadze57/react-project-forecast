import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";

const Header = ({ baseUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUsername(savedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUsername("");
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        document.body.style.overflow = "auto";
      } else if (isMobileOpen) {
        document.body.style.overflow = "hidden";
      }
    };

    if (isMobileOpen || isModalOpen) {
      // Блокуємо прокрутку тільки якщо це мобільне меню (на вузькому екрані)
      // або якщо це модалка (на будь-якому екрані)
      if (isModalOpen || (isMobileOpen && window.innerWidth <= 768)) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
    };
  }, [isMobileOpen, isModalOpen]);
  return (
    <>
      <header>
        <div className="container header__container">
          <Link className="logo__link" to="/">
            <svg className="logo">
              <use href={`${baseUrl}/icons.svg#logo`}></use>
            </svg>
          </Link>
          <nav className="header__nav">
            <ul className="header-nav__list">
              <li className="header-nav__item">
                <a href="#weather-cards" className="header-nav__link">
                  Your weather
                </a>
              </li>
              <li className="header-nav__item">
                <a href="#News" className="header-nav__link">
                  News
                </a>
              </li>
              <li className="header-nav__item">
                <a href="#Gallery" className="header-nav__link">
                  Gallery
                </a>
              </li>
            </ul>
          </nav>
          {username ? (
            <button className="header__btn button" onClick={handleLogout}>
              Hi, {username} (Exit)
            </button>
          ) : (
            <button className="header__btn button" onClick={() => setIsModalOpen(true)}>
              Sign Up
            </button>
          )}
          <svg className="header-user__svg">
            <use href={`${baseUrl}/icons.svg#user`}></use>
          </svg>
          <button className="header-mobile__btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? "Close ˃" : "Menu ˅"}
          </button>
        </div>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            onSuccess={(name) => {
              setUsername(name);
              setIsModalOpen(false);
            }}
          />
        )}
      </header>
      {isMobileOpen && <div className="mobile__backdrop" onClick={() => setIsMobileOpen(false)}></div>}
      <div className={`header-mobile__box ${isMobileOpen ? "" : "hidden"}`}>
        <nav className="header-mobile__nav">
          <ul className="header-mobile-nav__list">
            <li className="header-nav__item">
              <a href="#weather-cards" className="header-nav__link" onClick={() => setIsMobileOpen(false)}>
                Your weather
              </a>
            </li>
            <li className="header-nav__item">
              <a href="#News" className="header-nav__link" onClick={() => setIsMobileOpen(false)}>
                News
              </a>
            </li>
            <li className="header-nav__item">
              <a href="#Gallery" className="header-nav__link" onClick={() => setIsMobileOpen(false)}>
                Gallery
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-mobile-right__box">
          <svg className="header-user__svg">
            <use href={`${baseUrl}/icons.svg#user`}></use>
          </svg>
          {username ? (
            <button className="header__btn button" onClick={handleLogout}>
              Hi, {username} (Exit)
            </button>
          ) : (
            <button className="header__btn button" onClick={() => setIsModalOpen(true)}>
              Sign Up
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
