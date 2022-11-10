import React, { useState } from "react";
import { Button } from "../../atoms/shared/Button";

// Import Swiper React components
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { AnimatePresence, motion } from "framer-motion"

export const References = () => {
  const [showReferences, setShowReferences] = useState(false);

  return (
    <>
      <Button onClick={() => setShowReferences(!showReferences)} text={showReferences ? 'Ver Menos' : 'Ver Mas'} className={`m-auto w-3/4 my-6 md:w-80 `} />

      <AnimatePresence>
        {

          showReferences ? <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}


            className="bg-background py-12">
            <Swiper
              modules={[Autoplay, Pagination]}
              className="w-full h-80 bg-white max-w-lg md:rounded-md"
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide className="bg-cover" style={{backgroundImage: `url(/img/fundas.webp)`}}></SwiperSlide> 
              <SwiperSlide className="bg-cover" style={{backgroundImage: `url(/img/fundas.webp)`}}></SwiperSlide> 
              <SwiperSlide className="bg-cover" style={{backgroundImage: `url(/img/fundas.webp)`}}></SwiperSlide> 
              <SwiperSlide className="bg-cover" style={{backgroundImage: `url(/img/fundas.webp)`}}></SwiperSlide> 
            </Swiper>

            <div className="flex flex-col items-center text-secondary">
              <h3 className="text-2xl my-12">Nuestros Clientes Confian En Nosotros</h3>

              <p className="text-center text-xl max-w-lg">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem ab
                suscipit, quod, id explicabo dolorem velit quasi labore assumenda
                inventore alias praesentium? Porro nemo ut aperiam culpa animi
                quisquam distinctio.
              </p>

              <Button
                text="Mas Referencias"
                className="m-auto w-3/4 md:w-80 mt-6"
              />
            </div>
          </motion.div> : null
        }
      </AnimatePresence>

    </>
  );
};
