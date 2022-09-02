import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faMagnifyingGlass,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/molecules/shared/Navbar.module.scss";
import { NavLink } from "../../atoms/shared/NavLink";
import { useSelector } from "react-redux";
import { StoreState } from "../../../store";
import * as authTypes from '../../../store/types/auth'

export const Navbar = () => {
  const [extraMenu, setExtraMenu] = useState(false);

  const state = useSelector((store: StoreState) => store.auth.state)

  return (
    <header className={styles["header"]}>
      <nav className={styles["navbar"]}>
        <div className={styles["navbar__utils"]}>
          <FontAwesomeIcon
            icon={faBars}
            className={styles["navbar__bars"]}
            onClick={() => {
              setExtraMenu(!extraMenu);
            }}
          />

          <div className={styles["navbar__search"]}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={styles["navbar__search-icon"]}
            />
            <input
              type="text"
              placeholder="Buscar"
              className={styles["navbar__search-input"]}
            />
          </div>
        </div>
        <h1 className={styles["navbar__title"]}>ROAL CASES</h1>
        <div className={styles["navbar__cart-wrapper"]}>
          <FontAwesomeIcon
            icon={faShoppingCart}
            className={styles["navbar__cart"]}
          />
          <h3>Mi Carrito</h3>
        </div>
      </nav>
      <menu
        className={`${styles["menu"]} ${
          extraMenu ? styles["menu__active"] : styles["menu__disabled"]
        } `}
      >
        <ul className={styles["menu__items"]}>
        <NavLink text="Inicio" href={"/"} icon={faHome} />
          {
            state === authTypes.UNAUNTHENTICATED ?
            (
              <NavLink text="Iniciar Sesion" href={"/sign-in"} icon={faUser} />
            ) : (
              <NavLink text="Cuenta" href={"/profile"} icon={faUser} />
            )
          }
        </ul>
      </menu>

      <div
        className={`${styles["offers"]} ${
          extraMenu ? styles["offers__menu-active"] : ""
        } `}
      >
        <span>Oferta En La Compra De Dos Fundas</span>
      </div>
    </header>
  );
};
