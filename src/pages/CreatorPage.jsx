import React from "react";
import Header from "../components/Header/Header";
import { useRef, useState } from "react";
import "./CreatorPage.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import Footer from "../components/Footer/Footer";

function CreatorPage() {
    document.title = "AlteraBooks: Creator";
  return (
    <>
      <Header />
      <div className= "bio">
        <img className= "bio__circle" src = "/src/assets/images/creator.png"></img>

        <div className = "bio__text">
            <p>
            Hi, I'm Mashal Vajoo! Hope you enjoyed using AlteraBooks as much as I
            enjoyed creating it! I've included a couple of my personal recommendations below! Enjoy!
            </p>
            <p>
            You can find more of my projects here: <a href="https://github.com/MashalV" >https://github.com/MashalV</a>
            </p>
            <p>
            You can connect with me here: <a href= "https://www.linkedin.com/in/mashalvajoo/</p>">https://www.linkedin.com/in/mashalvajoo/</a>
            </p>
        </div>

        </div>
      <div className="grid">
        <Swiper
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <h3 className="self">Self-Help</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/src/assets/images/self-help.png" />
          </SwiperSlide>
        </Swiper>
        <Swiper
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <h3 className="fantasy">Fantasy</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/src/assets/images/fantasy.png" />
          </SwiperSlide>
        </Swiper>
        <Swiper
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <h3 className="classic">Classic</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/src/assets/images/classic.png" />
          </SwiperSlide>
        </Swiper>
        <Swiper
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <h3 className="thriller">Thriller</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="src/assets/images/thriller.png" />
          </SwiperSlide>
        </Swiper>
        <Swiper
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <h3 className="sci">Science-Fiction</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/src/assets/images/sci.png" />
          </SwiperSlide>
        </Swiper>
        <Swiper
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <h3 className="historical">Historical Romance</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/src/assets/images/hist.png" />
          </SwiperSlide>
        </Swiper>
      </div>
      <Footer />
    </>
  );
}

export default CreatorPage;
