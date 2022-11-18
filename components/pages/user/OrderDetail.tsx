import React, { FC } from 'react'
import { Order, OrderProduct } from '../../../models/order'
import { Main } from '../../layouts/Main'
import { OrderDetailProduct } from '../../molecules/user/OrderDetailProduct'

export const OrderDetail: FC<Order> = ({ products, status, total, user, address }) => {
  return (
    <Main>
        <div className='h-auto w-3/4 shadow-lg'>
            <div className='p-5 border-b border-gray-300 flex justify-between items-center'>
                <h2 className='text-3xl'>
                    { address.name }
                </h2>
                <h3 className='text-2xl'>
                    { address.street }
                </h3>
            </div>
            <div className='min-h-[250px] max-h-[500px]'>
                {
                    products.map((product: OrderProduct) => <OrderDetailProduct key={product.id} {...product} />)
                }
            </div>
            <div className='w-full flex justify-between border-t border-gray-300 p-5'>
                <span className='text-xl'>
                Total: ${ total }

                </span>
                <span className='text-xl'>
                    Estado: { status }
                </span>
            </div>
        </div>
    </Main>
  )
}
