import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDashboard,
  faHome,
  faMagnifyingGlass,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "../../atoms/shared/NavLink";
import { useSelector } from "react-redux";
import * as authTypes from '../../../redux/types/auth'
import { AppStore } from "../../../redux/store";
import { Cart } from "../../organisms/shared/Cart";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getCart } from "../../../services/cartService";
import { setCart } from "../../../redux/states/cart";
import Link from "next/link";

export const Navbar = () => {
  const [extraMenu, setExtraMenu] = useState(false);

  const { state, profile } = useSelector((store: AppStore) => store.auth)

  const { products } = useSelector((store: AppStore) => store.cart)

  const [showCart, setShowCart] = useState(false)

  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      const cart = await getCart()

      dispatch(setCart(cart))
    }

    if (state === authTypes.AUTHENTICATED) {
      init()
    }
  }, [state])


  return (
    <>
      <header style={{ "zIndex": "100000" }} className="w-full fixed top-0 z-50">
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
          <Link href={"/"}>
            <h1 className="text-center font-vogue text-4xl mt-2">ROAL CASES</h1>
          </Link>
          <div onClick={() => {
            if (state === authTypes.UNAUNTHENTICATED) {
              router.push("/sign-in")
            }

            if (state === authTypes.AUTHENTICATED) {
              setShowCart(!showCart)
            }
          }} className="w-full flex justify-end items-center cursor-pointer duration-300 text-secondary transition-all hover:text-primary">
            <span className="mr-2 text-xl">
              {products.length}
            </span>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-2xl"

            />
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
                  <>
                  <NavLink text="Cuenta" href={"/user"} icon={faUser} />
                  </>
                )
            }
            {
              profile?.role === "ADMIN" && <NavLink text="Dashboard" href={"/dashboard"} icon={faDashboard} />
            }
          </ul>
        </menu>

        <div
          className={`w-full bg-primary text-white flex justify-center transition-all duration-300 text-lg lg:text-xl p-1  ${extraMenu ? "mt-12" : ""
            } `}
        >
          <span>Oferta En La Compra De Dos Fundas</span>
        </div>
      </header>
      <AnimatePresence>
        {
          showCart && <Cart handleClose={() => setShowCart(false)} />
        }
      </AnimatePresence>

    </>

  );
};
