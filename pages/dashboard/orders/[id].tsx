import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { DashboardOrderDetail } from '../../../components/pages/dashboard/orders/DashboardOrderDetail';
import { Order } from '../../../models/order';
import { getOrder } from '../../../services/ordersService';

const OrdersPage: NextPage = () => {

    const [order, setOrder] = useState<Order | null>(null)

    const router = useRouter()

    useEffect(() => {
        (async () => {
            setOrder(await getOrder(router.query.id))
        })()
    })

    return (
        <Dashboard>
            {
                order ? <DashboardOrderDetail order={order} /> : <></>
            }
        </Dashboard>
    )
}

export default OrdersPage;