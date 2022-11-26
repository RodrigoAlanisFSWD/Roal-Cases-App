import { GetServerSideProps, NextPage } from 'next';
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { DashboardOrderDetail } from '../../../components/pages/dashboard/orders/DashboardOrderDetail';
import api from '../../../interceptors/axios';
import { Order } from '../../../models/order';

interface OrderDetailProps {
    order: Order
}

const OrdersPage: NextPage<OrderDetailProps> = ({ order }) => {
  return (
    <Dashboard>
        <DashboardOrderDetail order={order} />
    </Dashboard>
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

export default OrdersPage;