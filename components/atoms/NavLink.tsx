import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import styles from "../../styles/atoms/NavLink.module.scss";

export const NavLink = () => {
  return (
    <Link href={"/"}>
      <li className={styles["item"]}>
        <FontAwesomeIcon className={styles["item__icon"]} icon={faUser} />
        <span>Iniciar Sesion</span>
      </li>
    </Link>
  );
};
