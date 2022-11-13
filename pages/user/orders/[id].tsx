import { GetServerSideProps, NextPage } from 'next';
import React from 'react'
import { Protected } from '../../../components/layouts/Protected';
import { OrderDetail } from '../../../components/pages/user/OrderDetail';
import api from '../../../interceptors/axios';
import { Order } from '../../../models/order'
import { getOrder } from '../../../services/ordersService';

interface OrderDetailProps {
    order: Order;
}

const OrderDetailPage: NextPage<OrderDetailProps> = ({ order }) => {
  return (
    <Protected>
        <OrderDetail {...order} />
    </Protected>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const cookies = context.req.cookies;

    const order = await api.get<Order>("/orders/" + context.query.id, {
        headers: {
            Authorization: `Bearer ${cookies["roal_cases/access_token"]}`
        }
    })

    return {
        props: {
            order: order.data
        }
    }
}

export default OrderDetailPage