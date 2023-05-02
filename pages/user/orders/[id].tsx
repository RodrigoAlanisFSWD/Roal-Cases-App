import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Protected } from '../../../components/layouts/Protected';
import { OrderDetail } from '../../../components/pages/user/OrderDetail';
import api from '../../../interceptors/axios';
import { Order } from '../../../models/order'
import { getOrder } from '../../../services/ordersService';

const OrderDetailPage: NextPage<any> = ({ id }) => {

  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    (async () => {
      setOrder(await getOrder(id))
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id
    }
  }
}

export default OrderDetailPage