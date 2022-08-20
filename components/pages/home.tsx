import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../atoms/shared/Button";
import { Navbar } from "../molecules/shared/Navbar";
import { Categories } from "../organisms/home/Categories";
import { Hero } from "../organisms/home/Hero";
import { References } from "../organisms/home/References";
import styles from "../styles/pages/Home.module.scss";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../organisms/shared/Footer";

export const Home = () => {
  return (
    <div className={styles["home"]}>
      <Navbar />
      <Hero />
      <div className={styles["home__divider"]}>
        <h2>Nuestros Productos</h2>

        <Button className={styles["home__btn"]} text="Comprar Ahora" />
      </div>
      <Categories />
      <References />
      <div className={styles["home__warranty"]}>
        <div className={styles["home__warranty-icon"]}>
          <FontAwesomeIcon
            icon={faCheck}
            className={styles["home__warranty-check"]}
          />
        </div>
        <h3>Te Garantisamos Calidad</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo a at
          optio assumenda consequuntur quas, quo ipsam ducimus rem sequi ex et
          dignissimos neque nemo, ut quaerat dicta recusandae odio.
        </p>
      </div>
      <Footer />
    </div>
  );
};
