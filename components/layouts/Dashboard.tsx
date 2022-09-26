import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBars, faBell, faHouse, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Url } from "url";
import { StoreState } from "../../store";
import { DashboardLink } from "../atoms/dashboard/DashboardLink";
import { DashboardLinkGroup } from "../atoms/dashboard/DashboardLinkGroup";
import { DashboardHeader } from "../molecules/dashboard/DashboardHeader";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

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
    if (auth.profile) {
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
        text: "Products And More",
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
        href: "/dashboard/products/groups"
      },
      {
        text: "Products",
        icon: faHouse,
        href: "/dashboard/products/"
      },
    ],
  ]

  return (
    <div className="w-screen h-screen grid grid-cols-[50px_1fr] xl:grid-cols-[350px_1fr]">
      <div className="w-full h-screen flex z-10 sticky">
        <SmallSideBar links={links} />
        <div className="w-[350px] bg-[#292929] text-white hidden xl:flex flex-col items-center p-4 h-screen relative">
          <h1 className="m-4 mb-8 text-2xl sm:text-3xl">
            ROAL CASES
          </h1>

          <nav className="w-full">
            <h3 className="tracking-wider mb-3 text-xl sm:text-2xl">
              NAVIGATION
            </h3>

            <ul className="flex flex-col">
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
      </div>
      <div className="flex flex-col justify-between">
        <DashboardHeader />
        <div className="p-6 h-[calc(100vh-60px)] overflow-y-hidden">
          {children}
        </div>
      </div>
    </div>
  )
};

export const SmallSideBar: FC<any> = ({ links }) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <div className="flex justify-center pt-4 w-14 bg-[#292929] xl:hidden">
        <FontAwesomeIcon onClick={() => setShowMenu(!showMenu)} className="text-white text-2xl" icon={faBars} />
      </div>
      <AnimatePresence>
        {
          showMenu &&
          <motion.div
            initial={{ translateX: -500 }}
            animate={{ translateX: 0 }}
            exit={{ translateX: -500 }}
            transition={{ duration: 0.3 }} style={{zIndex: "100000"}} className="w-[calc(100vw-50px)] bg-[#292929] text-white flex xl:hidden flex-col items-center p-4 h-screen absolute ml-[50px] sm:w-[400px]">
            <h1 className="m-4 mb-8 text-2xl sm:text-3xl">
              ROAL CASES
            </h1>

            <nav className="w-full">
              <h3 className="tracking-wider mb-3 text-xl sm:text-2xl">
                NAVIGATION
              </h3>

              <ul className="flex flex-col">
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
          </motion.div>
        }
      </AnimatePresence>
    </>


  )
}