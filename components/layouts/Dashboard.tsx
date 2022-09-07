import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBell, faHouse, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Url } from "url";
import { StoreState } from "../../store";
import styles from '../../styles/layouts/Dashboard.module.scss'
import { DashboardLink } from "../atoms/dashboard/DashboardLink";
import { DashboardLinkGroup } from "../atoms/dashboard/DashboardLinkGroup";
import { DashboardHeader } from "../molecules/dashboard/DashboardHeader";
import * as authTypes from '../../store/types/auth';
import { useRouter } from "next/router";

interface DashboardProps {
  children: JSX.Element;
}

interface Link {
  text: string;
  icon: IconProp;
  href: Url | string;
}

export const Dashboard: FC<DashboardProps> = ({ children }) => {

  const auth = useSelector((store: StoreState) => store.auth)

  const router = useRouter();

  useEffect(() => {
    if (auth.state === authTypes.AUTHENTICATED && auth.profile) {
      if (auth.profile.role !== "ADMIN") {
        router.push("/sign-in")
      }
    }
  }, [auth.state])

  const links: Array<Array<Link>> = [
    [
      {
        text: "Dashboard",
        icon: faHouse,
        href: "/dashboard"
      },
    ],
    [
      {
        text: "Products",
        icon: faShoppingBag,
        href: "/dashboard"
      },
      {
        text: "Categories",
        icon: faHouse,
        href: "/dashboard/products/categories"
      },
      {
        text: "Groups",
        icon: faHouse,
        href: "/dashboard"
      },
    ],
  ] 

  return (
    <div className={styles['dashboard']}>
      <div className={styles['dashboard__sidebar']}>
        <h1>
          ROAL CASES
        </h1>

        <nav className={styles['dashboard__sidebar-menu']}>
          <h3>
            NAVIGATION
          </h3>

          <ul>
            {
              links.map((group: Link[]) => {
                if (group.length === 1) {
                  return (
                    <DashboardLink key={group[0].text} {...group[0]} href={group[0].href as Url} />
                  )
                } else {
                  return (
                    <DashboardLinkGroup key={group[0].text} group={group} />
                  )
                }
              })
            }
          </ul>
        </nav>
      </div>
      <div className={styles['dashboard__body']}>
        <DashboardHeader />
        <div className={styles['dashboard__content']}>
          { children }
        </div>
      </div>
    </div>
  )
};
