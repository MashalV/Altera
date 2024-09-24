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
import classic from "../assets/images/classic.png";
import sci from "../assets/images/sci.png";
import fantasy from "../assets/images/fantasy.png";
import self from "../assets/images/self-help.png";
import hist from "../assets/images/hist.png";
import thriller from "../assets/images/thriller.png";
import creator from "../assets/images/creator.png";

function CreatorPage() {
    document.title = "AlteraBooks: Creator";
  return (
    <>
      <Header />
      <div className= "bio">
        <img className= "bio__circle" src = {creator}></img>

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
            <img src={self} />
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
            <img src={fantasy} />
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
            <img src={classic} />
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
            <img src={thriller} />
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
            <img src={sci} />
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
            <img src={hist} />
          </SwiperSlide>
        </Swiper>
      </div>
      <Footer />
    </>
  );
}

export default CreatorPage;
