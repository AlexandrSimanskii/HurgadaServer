import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductSlider = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {}, [product]);

  return (
    <div className="product__slider">
      <Swiper
        loop={true}
        // navigation={true}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src={`/${product.image}`} alt="chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/image/chair3.png" alt="chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/image/chair4.png" alt="chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/image/chair5.png" alt="chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/image/chair6.png" alt="chair" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        // style={{
        //   "--swiper-navigation-color": "#fff",
        //   "--swiper-pagination-color": "#fff",
        // }}
        loop={true}
        spaceBetween={10}
        slidesPerView="auto"
        navigation={true}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper-product"
      >
        <SwiperSlide>
          <div className="a">
          <img src={`/${product.image}`} alt="chair" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="a">
            <img src="/images/image/chair3.png" alt="chair" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="a">
            <img src="/images/image/chair4.png" alt="chair" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="a">
            <img src="/images/image/chair5.png" alt="chair" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="a">
            <img src="/images/image/chair6.png" alt="chair" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductSlider;
