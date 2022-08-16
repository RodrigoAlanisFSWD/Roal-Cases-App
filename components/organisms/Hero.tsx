import React from "react";
import styles from "../../styles/organisms/Hero.module.scss";
import { Button } from "../atoms/Button";
import { HeroPolaroid } from "../atoms/HeroPolaroid";

export const Hero = () => {
  return (
    <div className={styles["hero"]}>
      <div className={styles["hero__content"]}>
        <div className={styles["hero__images"]}>
          <HeroPolaroid
            image="/case.svg"
            size="xl"
            className={styles["hero__image-xl"]}
          />
          <HeroPolaroid
            image="/case.svg"
            size="md"
            className={styles["hero__image-md"]}
          />
          <HeroPolaroid
            image="/case.svg"
            size="sm"
            className={styles["hero__image-sm"]}
          />
        </div>

        <div className={styles["hero__info"]}>
          <h2>Titulo Del Hero</h2>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem a
            atque, sed incidunt sit magnam. Aliquid, eveniet cum vel
            exercitationem quod minus dolore nisi cupiditate vero animi omnis
            itaque fuga!
          </p>

          <Button text="Ver Mas" className={styles["hero__btn"]} />
        </div>
      </div>
    </div>
  );
};
