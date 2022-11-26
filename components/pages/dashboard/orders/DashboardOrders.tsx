import React, { FC } from 'react'
import { Order } from '../../../../models/order'
import { DashboardOrder } from '../../../molecules/dashboard/orders/DashboardOrder'

interface OrdersProps {
    orders: Order[]
}

export const DashboardOrders: FC<OrdersProps> = ({ orders }) => {
  return (
    <div>
        <h2 className='text-2xl mb-5'>
            Ordenes
        </h2>

        {
            orders.map((order: Order) => <DashboardOrder key={order.id} {...order} />)
        }
    </div>
  )
}
