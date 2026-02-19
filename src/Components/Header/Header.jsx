import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";

const Header = ({ baseUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");

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
    </>
  );
};

export default Header;
