import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Protected } from '../../../components/layouts/Protected';
import { OrderDetail } from '../../../components/pages/user/OrderDetail';
import api from '../../../interceptors/axios';
import { Order } from '../../../models/order'
import { getOrder } from '../../../services/ordersService';

const OrderDetailPage: NextPage = () => {

  const [order, setOrder] = useState<Order | null>(null)

  const router = useRouter()

  useEffect(() => {
    (async () => {
        setOrder(await getOrder(router.query.id))
    })()
  }, [])

  return (
    <Protected>
        {
            order ? <OrderDetail {...order} /> : <></>
        }
    </Protected>
  )
}

export default OrderDetailPage