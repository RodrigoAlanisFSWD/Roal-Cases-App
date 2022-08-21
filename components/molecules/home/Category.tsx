import React from "react";
import styles from "../../../styles/molecules/home/Category.module.scss";

export const Category = () => {
  return (
    <div className={styles["category"]}>
      <div className={styles["category__card"]}>
        <div className={styles["category__price"]}>$00.00</div>
      </div>
      <div className={styles["category__info"]}>
        <h3>Category Title</h3>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
          ratione laborum quidem quod aliquid tempora exercitationem ducimus
          optio veritatis aperiam, voluptates cum, illo quae debitis minima
          distinctio? Blanditiis, iure eveniet!
        </p>
      </div>
    </div>
  );
};
