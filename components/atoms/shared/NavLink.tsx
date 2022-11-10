import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { Url } from "url";

interface NavLinkProps {
  href?: any;
  text: string;
  icon: IconProp;
}

export const NavLink: FC<NavLinkProps> = ({ href = '/', text, icon }) => {

  const router = useRouter()

  return (
    <Link href={href} className="h-full">
      <li className={`px-4 flex h-full items-center cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white ${router.pathname == href ? "bg-primary text-white" : 'text-secondary'}`}>
        <FontAwesomeIcon className="text-xl" icon={icon} />
        <span className="ml-3">{ text }</span>
      </li>
    </Link>
  );
};
