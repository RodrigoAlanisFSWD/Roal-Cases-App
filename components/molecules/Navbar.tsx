import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/molecules/Navbar.module.scss';

export const Navbar = () => {
  return (
    <header className={styles['header']}>
    <nav className={styles['navbar']}>
        <div className={styles['navbar__utils']}>
            <FontAwesomeIcon icon={faBars} className={styles['navbar__bars']} />
        </div>
      <h1 className={styles['navbar__title']}>ROAL CASES</h1>
      <div className={styles['navbar__cart-wrapper']}>
        <FontAwesomeIcon icon={faShoppingCart} className={styles['navbar__cart']} />
      </div>
    </nav>
    <div className={styles['offers']}>
      <span>
        Oferta En La Compra De Dos Fundas
      </span>
    </div>
    </header>
  );
};
