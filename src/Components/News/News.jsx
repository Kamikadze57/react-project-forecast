import { useState, useEffect } from "react";
import axios from "axios";
import placeholderImg from "/placeholder.png";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=any&pageSize=4&page=${page}&apiKey=${API_KEY}`);
        const newArticles = response.data.articles;
        setArticles((prev) => (page === 1 ? newArticles : [...prev, ...newArticles]));
      } catch (error) {
        console.error("News API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [API_KEY, page]);

  const handleSeeMore = () => setPage((prev) => prev + 1);

  return (
    <section className="news">
      <div className="container">
        <h2 className="news__title title">Situation in the world</h2>
        <ul className="news__list">
          {articles.map((article, index) => (
            <li key={`${index}`} className="news__item">
              <a className="news-item__link" href={article.url}>
                <img
                  src={article.urlToImage || placeholderImg}
                  alt={article.title}
                  className="news__img"
                  onError={(e) => {
                    e.target.src = placeholderImg;
                  }}
                />
                <p className="news__text">{article.title}</p>
              </a>
            </li>
          ))}
        </ul>
        <button className="news__btn button" onClick={handleSeeMore} disabled={loading}>
          {loading ? "Loading..." : "See more"}
        </button>
      </div>
    </section>
  );
};

export default News;
