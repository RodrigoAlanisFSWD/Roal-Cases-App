import React, { FC, useEffect, useRef } from "react";
import styles from "../../../styles/HeroPolaroid.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";

interface HeroPolaroidProps {
  changing?: Boolean;
  image: string;
  size: string;
  className?: string;
}

export const HeroPolaroid: FC<HeroPolaroidProps> = ({
  image,
  size,
  className,
}) => {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return styles["hero-polaroid--sm"];
      case "md":
        return styles["hero-polaroid--md"];
      case "xl":
        return styles["hero-polaroid--xl"];
    }
  };

  const images = ["/img/case.svg", "/img/case-2.webp"];

  return (
    <div
      className={`${styles["hero-polaroid"]} ${getSizeClass()} ${className}`}
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: false,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        className={styles["hero-polaroid__wrapper"]}
        slidesPerView={1}
      >
        {images.map((image) => (
          <SwiperSlide key={image} className={styles["hero-polaroid__slide"]}>
            <img src={image} className={styles["hero_polaroid__image"]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
