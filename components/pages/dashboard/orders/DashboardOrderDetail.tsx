import React, { FC } from 'react'
import { Order, OrderProduct } from '../../../../models/order'
import { OrderDetailProduct } from '../../../molecules/user/OrderDetailProduct'

interface OrderDetailProps {
    order: Order
}

export const DashboardOrderDetail: FC<OrderDetailProps> = ({ order: { user, address, created_at, products, status, total } }) => {
  return (
    <div>
        <div className='flex justify-between items-center border-b border-gray-300 py-3'>
        <h2 className='text-2xl'>
            Orden De: { user.name }
        </h2>
        <h3 className='text-2xl'>
            { created_at }
        </h3>
        </div>
        <div>
            {
                products.map((product: OrderProduct) => <OrderDetailProduct key={product.id} {...product} />)
            }
        </div>
        <div className='text-xl flex justify-between border-t border-gray-300 py-3'>
            <h3>
                Total: ${ total }
            </h3>
            <h3>
                Estado: ${ status }
            </h3>
        </div>
    </div>
  )
}
