import { GetServerSideProps, NextPage } from 'next';
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { DashboardOrders } from '../../../components/pages/dashboard/orders/DashboardOrders';
import api from '../../../interceptors/axios';
import { Order } from '../../../models/order';

interface OrdersProps {
    orders: Order[]
}

const OrdersPage: NextPage<OrdersProps> = ({ orders }) => {
  return (
    <Dashboard>
        <DashboardOrders orders={orders} />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const cookies = context.req.cookies;

    const orders = await api.get<Order[]>("/orders/", {
        headers: {
            Authorization: `Bearer ${cookies["roal_cases/access_token"]}`
        }
    })

    return {
        props: {
            orders: orders.data
        }
    }
}

export default OrdersPage;