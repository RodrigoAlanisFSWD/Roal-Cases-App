import React, { FC, useEffect, useState } from 'react'
import { Navbar } from '../molecules/shared/Navbar'
import { Footer } from '../organisms/shared/Footer'
import { AnimatePresence, motion } from 'framer-motion'
import Router from "next/router"
import { PageLoader } from './PageLoader'

export const Main: FC<any> = ({ children }) => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Used for page transition
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  return (
    <div className="w-screen min-h-screen">

      <Navbar />

      {
        loading ? <PageLoader /> : <motion.div initial={{ x: 500, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 500, opacity: 1 }}   className='w-full min-h-screen object-cover pt-[100px] flex justify-center items-center'>
          {children}
        </motion.div>
      }


      <Footer />
    </div>
  )
}
