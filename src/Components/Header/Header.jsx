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
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileOpen]);
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
                <a href="#" className="header-nav__link">
                  Who we are
                </a>
              </li>
              <li className="header-nav__item">
                <a href="#" className="header-nav__link">
                  Contacts
                </a>
              </li>
              <li className="header-nav__item">
                <a href="#" className="header-nav__link">
                  Menu
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
      {isMobileOpen && (
        <div className="mobile__backdrop" onClick={() => setIsMobileOpen(false)}></div>
      )}
      <div className={`header-mobile__box ${isMobileOpen ? "" : "hidden"}`}>
        <nav className="header-mobile__nav">
          <ul className="header-mobile-nav__list">
            <li className="header-nav__item">
              <a href="#" className="header-nav__link">
                Who we are
              </a>
            </li>
            <li className="header-nav__item">
              <a href="#" className="header-nav__link">
                Contacts
              </a>
            </li>
            <li className="header-nav__item">
              <a href="#" className="header-nav__link">
                Menu
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
