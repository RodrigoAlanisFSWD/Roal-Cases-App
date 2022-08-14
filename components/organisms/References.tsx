import React from "react";
import { Button } from "../atoms/Button";
import styles from "../../styles/organisms/References.module.scss";

export const References = () => {
  return (
    <>
      <Button text="Ver Mas" className={styles["references__btn"]} />

      <div className={styles['references']}>
        <div className={styles['references__swipper']}></div>

        <div className={styles['references__info']}>
          <h3>Nuestros Clientes Confian En Nosotros</h3>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem ab
            suscipit, quod, id explicabo dolorem velit quasi labore assumenda
            inventore alias praesentium? Porro nemo ut aperiam culpa animi
            quisquam distinctio.
          </p>

          <Button text="Mas Referencias" className={styles['references__btn']} />
        </div>
      </div>
    </>
  );
};
