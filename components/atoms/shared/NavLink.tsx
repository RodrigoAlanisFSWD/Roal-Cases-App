import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { Url } from "url";
import styles from "../../../styles/atoms/shared/NavLink.module.scss";

interface NavLinkProps {
  href?: Url;
  text: string;
  icon: IconProp;
}

export const NavLink: FC<NavLinkProps> = ({ href = '/', text, icon }) => {

  const router = useRouter()

  return (
    <Link href={href}>
      <li className={`${styles["item"]} ${router.pathname == href ? styles['item--active'] : ''}`}>
        <FontAwesomeIcon className={styles["item__icon"]} icon={icon} />
        <span>{ text }</span>
      </li>
    </Link>
  );
};
