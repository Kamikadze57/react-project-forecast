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
            <h6 className="footer__title footer-contact__title">Contact Us</h6>
            <ul className="footer-contact__list">
              <li className="footer-contact__item">
                <a className="footer-contact__link" href="https://www.instagram.com/" target="_blank">
                  <svg className="footer-contact__svg">
                    <use href={`${baseUrl}/icons.svg#inst`}></use>
                  </svg>
                </a>
              </li>
              <li className="footer-contact__item">
                <a className="footer-contact__link" href="https://www.facebook.com/?locale=uk_UK" target="_blank">
                  <svg className="footer-contact__svg">
                    <use href={`${baseUrl}/icons.svg#facebook`}></use>
                  </svg>
                </a>
              </li>
              <li className="footer-contact__item">
                <a className="footer-contact__link" href="https://www.whatsapp.com/?lang=uk" target="_blank">
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
