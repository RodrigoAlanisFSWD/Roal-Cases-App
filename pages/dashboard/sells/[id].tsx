import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { SellDetail } from '../../../components/pages/dashboard/sells/SellDetail'
import { Sell } from '../../../models/sell'
import { getSell } from '../../../services/sellService'

const SellPage = () => {

    const [sell, setSell] = useState<Sell | null>(null)

    const router = useRouter()

    useEffect(() => {
        (async () => {
            setSell(await getSell(router.query.id))
        })()
    })


  return (
    <Dashboard>
        {
            sell ? <SellDetail sell={sell} /> : <></>
        }
    </Dashboard>
  )
}

export default SellPage
