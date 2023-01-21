import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardLink } from "../atoms/dashboard/DashboardLink";
import { DashboardLinkGroup } from "../atoms/dashboard/DashboardLinkGroup";
import { DashboardHeader } from "../molecules/dashboard/DashboardHeader";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { AppStore } from "../../redux/store";
import { NavItem } from "../../models/navbar";
import { useDashboardMenu } from "../../hooks/dashboardMenu";
import Link from "next/link";
import { Protected } from "./Protected";

interface DashboardProps {
  children: JSX.Element;
}

export const Dashboard: FC<DashboardProps> = ({ children }) => {

  const auth = useSelector((store: AppStore) => store.auth)

  const router = useRouter();

  useEffect(() => {
    if (auth.profile) {
      if (auth.profile.role !== "ADMIN") {
        router.push("/sign-in")
      }
    }
  }, [auth.state])

  const { menu } = useDashboardMenu()

  return (
    <Protected>
      <div className="w-screen h-screen grid grid-cols-[50px_1fr] xl:grid-cols-[350px_1fr]">
        <div className="w-full h-screen flex z-10 sticky">
          <SmallSideBar menu={menu} />
          <div className="w-[350px] bg-[#292929] text-white hidden xl:flex flex-col items-center p-4 h-screen relative">
            <Link href={"/"}>
              <h1 className="m-4 mb-8 text-2xl sm:text-3xl cursor-pointer">
                ROAL CASES
              </h1>
            </Link>


            <nav className="w-full">
              <h3 className="tracking-wider mb-3 text-xl sm:text-2xl">
                NAVIGATION
              </h3>

              <ul className="flex flex-col">
                {
                  menu.map((item: NavItem) => {
                    if (item.isGroup) {
                      return <DashboardLinkGroup group={item} key={item.header.text} />
                    } else if (!item.isGroup) {
                      const link = item.header
                      return <DashboardLink href={link.href} icon={link.icon} text={link.text} key={item.header.text} />
                    }
                  })
                }
              </ul>
            </nav>
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-[60px_1fr] max-h-screen">
          <DashboardHeader />
          <div className="md:p-6 h-[calc(100vh-60px)] overflow-y-scroll">
            {children}
          </div>
        </div>
      </div>
    </Protected>

  )
};

export const SmallSideBar: FC<any> = ({ menu }) => {
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
            transition={{ duration: 0.3 }} style={{ zIndex: "100000" }} className="w-[calc(100vw-50px)] bg-[#292929] text-white flex xl:hidden flex-col items-center p-4 h-screen absolute ml-[50px] sm:w-[400px]">
            <Link href={"/"}>
              <h1 className="m-4 mb-8 text-2xl sm:text-3xl cursor-pointer">
                ROAL CASES
              </h1>
            </Link>

            <nav className="w-full">
              <h3 className="tracking-wider mb-3 text-xl sm:text-2xl">
                NAVIGATION
              </h3>

              <ul className="flex flex-col">
                {
                  menu.map((item: NavItem) => {
                    if (item.isGroup) {
                      return <DashboardLinkGroup group={item} key={item.header.text} />
                    } else if (!item.isGroup) {
                      const link = item.header
                      return <DashboardLink href={link.href} icon={link.icon} text={link.text} key={item.header.text} />
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