import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/molecules/Navbar.module.scss";
import { NavLink } from "../atoms/NavLink";

export const Navbar = () => {
  const [extraMenu, setExtraMenu] = useState(false);

  return (
    <header className={styles["header"]}>
      <nav className={styles["navbar"]}>
        <div className={styles["navbar__utils"]}>
          <FontAwesomeIcon
            icon={faBars}
            className={styles["navbar__bars"]}
            onClick={() => { 
              setExtraMenu(!extraMenu) 
            }}
          />
        </div>
        <h1 className={styles["navbar__title"]}>ROAL CASES</h1>
        <div className={styles["navbar__cart-wrapper"]}>
          <FontAwesomeIcon
            icon={faShoppingCart}
            className={styles["navbar__cart"]}
          />
        </div>
      </nav>
        <menu className={`${styles['menu']} ${extraMenu ? styles['menu__active'] : styles['menu__disabled'] } `}>
          <ul className={styles['menu__items']}>
            <NavLink />
          </ul>
        </menu>

      <div className={`${styles["offers"]} ${extraMenu ? styles['offers__menu-active'] : ''} `}>
        <span>Oferta En La Compra De Dos Fundas</span>
      </div>
    </header>
  );
};
