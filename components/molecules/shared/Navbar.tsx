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
    <header style={{"zIndex": "100000"}} className="w-full fixed z-50">
      <div className="w-full h-16 grid grid-cols-navbar-small sm:grid-cols-navbar items-center border border-b-primary px-4 z-10 bg-white">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faBars}
            className="text-3xl text-secondary cursor-pointer"
            onClick={() => {
              setExtraMenu(!extraMenu);
            }}
          />

          <div className="hidden sm:flex items-center border-b border-b-secondary px-2 pb-2 ml-4">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-secondary text-lg lg:text-xl"
            />
            <input
              type="text"
              placeholder="Buscar"
              className="w-36 lg:w-52 text-lg lg:text-xl outline-none pl-3 placeholder:text-secondary"
            />
          </div>
        </div>
        <h1 className="text-center font-vogue text-4xl mt-2">ROAL CASES</h1>
        <div className="w-full flex justify-end items-center cursor-pointer duration-300 text-secondary transition-all hover:text-primary">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-2xl"
          />
          <h3 className="hidden sm-block ml-4">Mi Carrito</h3>
        </div>
      </div>
      <menu
        className={`absolute w-full h-12 bg-white -translate-y-full -z-10 opacity-0 ${extraMenu ? "animate-showMenu" : "animate-hideMenu"}`}
      >
        <ul className="w-full h-full flex items-center">
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
        className={`w-full bg-primary text-white flex justify-center transition-all duration-300 text-lg lg:text-xl p-1  ${
          extraMenu ? "mt-12" : ""
        } `}
      >
        <span>Oferta En La Compra De Dos Fundas</span>
      </div>
    </header>
  );
};
