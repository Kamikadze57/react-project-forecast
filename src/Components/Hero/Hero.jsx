const Hero = ({ baseUrl }) => {
  return (
    <>
      <section className="hero">
        <div className="container hero__container">
          <h1 className="hero__title">Weather dashboard</h1>
          <div className="hero__box">
            <h2 className="hero__subtitle">
              Create your personal list of <br />
              favorite cities and always be <br />
              aware of the weather.
            </h2>
            <p className="hero__subtitle">
              October 2023
              <br />
              Friday, 13<sup className="hero-subtitle__sup">th</sup>
            </p>
          </div>
          <form className="hero-search__form">
            <input className="hero-search__input" placeholder="Search location..." />
            <button className="hero-search__btn">
              <svg className="hero-search__svg">
                <use href={`${baseUrl}/icons.svg#search`}></use>
              </svg>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
