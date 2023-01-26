import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { Sells } from '../../../components/pages/dashboard/sells/Sells'
import { Sell } from '../../../models/sell'
import { getSells } from '../../../services/sellService'

const SellsPage: NextPage = () => {

    const [sells, setSells] = useState<Sell[]>([])

    useEffect(() => {
        (async () => {
            setSells(await getSells())
        })()
    })

  return (
    <Dashboard>
        <Sells sells={sells} />
    </Dashboard>
  )
}

export default SellsPage
