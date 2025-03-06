import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { CustomContext } from "../../utils/Context/Context";
import {  useContext } from "react";

const Banner = () => {
  const { setCategory } = useContext(CustomContext);

  const navigate = useNavigate();

  const toCotalog = () => {
    navigate("/catalog");
    setCategory("");
  };

  return (
    <section className="banner">
      <div className="container">
        <div className="banner__inner">
          <Swiper
            loop={true}
            // autoplay={{ delay: 3000 }}
            speed={1500}
            navigation={{
              nextEl: ".myslider-next",
              prevEl: ".myslider-prev",
            }}
            pagination={{ clickable: true }}
            modules={[Navigation, Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="images/image/Main-Img.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                navigate("/catalog");
              }}
            >
              <picture>
                <source srcSet="images/image/slider.webp" type="image/webp" />
                <img src="images/image/slider.jpg" alt="" />
              </picture>
            </SwiperSlide>
            <SwiperSlide onClick={() => navigate("/catalog")}>
              <img src="images/image/Main-Img.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide onClick={() => navigate("/catalog")}>
              <picture>
                <source srcSet="images/image/slider.webp" type="image/webp" />
                <img src="images/image/slider.jpg" alt="" />
              </picture>
            </SwiperSlide>
            <SwiperSlide onClick={() => navigate("/catalog")}>
              <img src="images/image/Main-Img.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide onClick={() => navigate("/catalog")}>
              <picture>
                <source srcSet="images/image/slider.webp" type="image/webp" />
                <img src="images/image/slider.jpg" alt="" />
              </picture>
            </SwiperSlide>
          </Swiper>

          <div className="myslider__btns">
            <button className="myslider-prev">
              <img src="images/icons/Tick2.svg" alt="arrow" />
            </button>
            <button className="myslider-next">
              <img src="images/icons/Tick2.svg" alt="arrow" />
            </button>
          </div>
          <div className="banner__info">
            <h2 className="banner_title">
              loft <br />
              мебель
            </h2>
            <p className="banner_text">
              Современная и удобная мебель <span>в Анапе</span>
            </p>
            <p className="banner_text-mini">
              С бесплатной доставкой по Калининграду
            </p>
            <button
              onClick={() => {
                toCotalog();
              }}
              className="banner_btn"
            >
              СМОТРЕТЬ КАТАЛОГ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
