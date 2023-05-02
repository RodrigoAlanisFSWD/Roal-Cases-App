import { Order } from '../../../../models/order'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Main } from '../../../../components/layouts/Main'
import { Protected } from '../../../../components/layouts/Protected'
import { FinishOrder } from '../../../../components/pages/user/FinishOrder'
import api from '../../../../interceptors/axios'
import { getOrder } from '../../../../services/ordersService'

const FinishOrderPage: NextPage = () => {

  const [order, setOrder] = useState<Order | null>(null)

  const router = useRouter()

  useEffect(() => {
    (async () => {
        setOrder(await getOrder(router.query.id))
    })()
  })

  return (
    <Protected>
      <Main>
        {
          order ? <FinishOrder order={order} /> : <></>
        }
      </Main>
    </Protected>
  )
}

export default FinishOrderPage
