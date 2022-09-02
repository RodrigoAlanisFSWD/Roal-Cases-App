import React, { useState } from "react";
import { Button } from "../../atoms/shared/Button";
import styles from "../../../styles/organisms/home/References.module.scss";

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
      <Button onClick={() => setShowReferences(!showReferences)} text={showReferences ? 'Ver Menos' : 'Ver Mas'} className={`${styles["references__btn"]} ${styles["references__btn--top"]} `} />

      <AnimatePresence>
        {

          showReferences ? <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}


            className={styles["references"]}>
            <Swiper
              modules={[Autoplay, Pagination]}
              className={styles["references__swiper"]}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide className={styles["references__slide"]}></SwiperSlide>
              <SwiperSlide className={styles["references__slide"]}></SwiperSlide>
              <SwiperSlide className={styles["references__slide"]}></SwiperSlide>
              <SwiperSlide className={styles["references__slide"]}></SwiperSlide>
            </Swiper>

            <div className={styles["references__info"]}>
              <h3>Nuestros Clientes Confian En Nosotros</h3>

              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem ab
                suscipit, quod, id explicabo dolorem velit quasi labore assumenda
                inventore alias praesentium? Porro nemo ut aperiam culpa animi
                quisquam distinctio.
              </p>

              <Button
                text="Mas Referencias"
                className={styles["references__btn"]}
              />
            </div>
          </motion.div> : null
        }
      </AnimatePresence>

    </>
  );
};
