import React from "react";
import styles from "../../../styles/Hero.module.scss";
import { Button } from "../../atoms/shared/Button";
import { HeroPolaroid } from "../../atoms/home/HeroPolaroid";

export const Hero = () => {
  return (
    <div className={styles["hero"]}>
      <div style={{"maxWidth": "1500px"}} className="w-full h-full lg:max-h-screen lg:p-12 p-6 pt-32 flex flex-col lg:flex-row-reverse lg:justify-between items-center">
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

        <div className="mt-14 w-3/4 lg:w-2/4 xl:w-1/3 flex flex-col items-center lg:items-start justify-end">
          <h2 className="mb-8 text-3xl text-secondary">Titulo Del Hero</h2>

          <p className="hidden lg:block mb-6 text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem a
            atque, sed incidunt sit magnam. Aliquid, eveniet cum vel
            exercitationem quod minus dolore nisi cupiditate vero animi omnis
            itaque fuga!
          </p>

          <Button text="Ver Mas" className="lg:w-60 md:w-72" />
        </div>
      </div>
    </div>
  );
};
