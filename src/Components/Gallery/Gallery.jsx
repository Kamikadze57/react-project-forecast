import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

import placeholderImg from "/placeholder.png";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=nature+landscape&image_type=photo&per_page=12`);
        const data = response.data.hits;
        console.log(data);
        setImages(data);
      } catch (error) {
        console.error("Pixabay API Error:", error);
      }
    };
    if (API_KEY) fetchImages();
  }, [API_KEY]);

  return (
    <section className="gallery">
      <div className="container">
        <h2 className="gallery__title title">Beautiful nature</h2>
        <div className="gallery__slider-container">
          {images.length > 0 ? (
            <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards, Navigation]} navigation={true} className="gallery-swiper">
              {images.map((img) => (
                <SwiperSlide key={img.id}>
                  <img src={img.largeImageURL || placeholderImg} alt={img.tags} className="gallery__img" />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>Loading nature gallery...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
