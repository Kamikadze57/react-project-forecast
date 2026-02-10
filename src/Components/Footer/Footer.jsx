const Footer = ({ baseUrl }) => {
  return (
    <>
      <footer>
        <div className="container footer__container">
          <a className="logo__link">
            <svg className="logo">
              <use href={`${baseUrl}/icons.svg#logo`}></use>
            </svg>
          </a>
          <div className="footer-address__box">
            <h6 className="footer__title">Address</h6>
            <address className="footer__address">Svobody str. 35</address>
            <address className="footer__address">Kyiv</address>
            <address className="footer__address">Ukraine</address>
          </div>
          <div className="footer-contact__box">
            <h6 className="footer__title">Contact Us</h6>
            <ul className="footer-contact__list">
              <li className="footer-contact__item">
                <a className="footer-contact__link">
                  <svg className="footer-contact__svg">
                    <use href={`${baseUrl}/icons.svg#inst`}></use>
                  </svg>
                </a>
              </li>
              <li className="footer-contact__item">
                <a className="footer-contact__link">
                  <svg className="footer-contact__svg">
                    <use href={`${baseUrl}/icons.svg#facebook`}></use>
                  </svg>
                </a>
              </li>
              <li className="footer-contact__item">
                <a className="footer-contact__link">
                  <svg className="footer-contact__svg">
                    <use href={`${baseUrl}/icons.svg#whatsapp`}></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
