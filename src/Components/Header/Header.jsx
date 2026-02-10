import Modal from "./Modal/Modal";

const Header = ({ baseUrl }) => {
  return (
    <>
      <header>
        <div className="container header__container">
          <a className="logo__link">
            <svg className="logo">
              <use href={`${baseUrl}/icons.svg#logo`}></use>
            </svg>
          </a>
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
          <button className="header__btn">Sign Up</button>
          <svg className="header-user__svg">
            <use href={`${baseUrl}/icons.svg#user`}></use>
          </svg>
        </div>
        <Modal/>
      </header>
    </>
  );
};

export default Header;
