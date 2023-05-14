import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import 'swiper/css/pagination';
import "swiper/css/effect-creative";
import { Autoplay, EffectCoverflow, EffectCreative, Pagination } from "swiper";

import styles from '../../../styles/Hero.module.scss'
import { Button } from "../../atoms/shared/Button";
import Image from "next/image";
import { useImage } from "../../../hooks/useImage";

export const Hero = () => {
  return (
    <div className="lg:h-[calc(100vh-100px)] mt-[100px] grid lg:grid-cols-8 grid-cols-1">
      <div className="w-full p-8 sm:p-12 lg:p-5 col-span-4 flex flex-col justify-center lg:items-start items-center lg:border-none border-t border-gray-200">
        <div className="sm:w-[500px] lg:w-[650px]  lg:ml-12 flex flex-col lg:items-start items-center">
          <h2 className="sm:text-4xl text-3xl md:text-6xl font-roboto mb-5 lg:text-start text-center">
            Ahora compra con nuestra nueva pagina web!
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-start text-center">
            Crea una cuenta, compra cualquiera de nuestros productos y obten seguimiento activo de tu orden.
          </h3>
          <Button text="Empezar a comprar" className="sm:w-[300px] mt-8" />
        </div>

      </div>
      <Swiper
        modules={[Pagination, EffectCreative, Autoplay]}
        slidesPerView={'auto'}
        className={`w-full h-[calc(100vh-100px)] lg:w-full lg:h-full lg:border-l border-gray-300 col-span-4 ${styles.slider} row-start-1 row-end-2 lg:row-start-auto lg:row-end-auto`}
        pagination={{ clickable: true }}
        loop={true}
        centeredSlides={true}
        spaceBetween={30}
        effect={"creative"}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        creativeEffect={{
          prev: {
            translate: ["-100%", 0, 0],
            scale: 0.8
          },
          next: {
            translate: ["100%", 0, 0],
            scale: 0.8
          },
        }}
      >
        <SwiperSlide className="flex items-center">
          <Image src={useImage("/files/defaults/white.jpeg")} alt="Case Image" className="sm:w-[250px] 2xl:w-[325px]" width="350" height="600" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center">
          <Image src={useImage("/files/defaults/white.jpeg")} alt="Case Image" className="sm:w-[250px] 2xl:w-[325px]" width="350" height="600" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
