import React, { FC } from 'react'
import { traduceOrderState } from '../../../adapters/traductors'
import { Order, OrderProduct } from '../../../models/order'
import { calcPercent } from '../../../utilities/prices'
import { Main } from '../../layouts/Main'
import { OrderDetailProduct } from '../../molecules/user/OrderDetailProduct'

export const OrderDetail: FC<Order> = ({ products, status, total, address, shipment, discount }) => {

  const getPrice = () => {
    const price = discount ? ((total - shipment.price) - calcPercent(total - shipment.price, discount.percent)) + shipment.price : total

    return price
  }

  return (
    <Main>
      <div className='max-h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] sm:h-auto w-full sm:w-3/4 shadow-lg'>
        <div className='p-5 border-b border-gray-300 flex flex-col sm:flex-row justify-between sm:items-center'>
          <h2 className='text-2xl sm:text-3xl mb-2 sm:mb-0'>
            {address.name}
          </h2>
          <h3 className='text-xl sm:text-2xl'>
            {address.street}
          </h3>
        </div>
        <div className='min-h-[250px] max-h-[500px]'>
          {
            products.map((product: OrderProduct) => <OrderDetailProduct key={product.id} {...product} />)
          }
        </div>
        <div className='w-full flex justify-between border-t border-gray-300 p-5'>
          <span className='text-xl'>
            Estado: {traduceOrderState(status)}
          </span>
          <span className='text-xl'>
            Tipo De Envio: {shipment.name} - ${shipment.price}
          </span>
        </div>
        <div className="p-5 border-b border-t border-gray-200 w-full">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl">Precio:</h3>
            <h3 className="text-xl">{
              discount ?
                (
                  <>
                    ${total - shipment.price + ' '}
                    <span className="text-primary mr-2">
                      - %{discount.percent}
                    </span>
                  </>
                ) : total - shipment.price
            }</h3>
          </div>
          <div className="flex justify-between">
            <h3 className="text-xl">Envio:</h3>
            <h3 className="text-xl">${shipment?.price || 0}</h3>
          </div>
        </div>
        <div className="flex justify-between p-5 border-b border-gray-200">
          <h3 className="text-xl">Total:</h3>
          <h3 className="text-xl">
            ${getPrice()}
          </h3>
        </div>
      </div>

    </Main>
  )
}
