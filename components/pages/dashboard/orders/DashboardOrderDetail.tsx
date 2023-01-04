import React, { FC } from 'react'
import { traduceOrderState } from '../../../../adapters/traductors'
import { Order, OrderProduct } from '../../../../models/order'
import { calcPercent } from '../../../../utilities/prices'
import { OrderDetailProduct } from '../../../molecules/user/OrderDetailProduct'

interface OrderDetailProps {
    order: Order
}

export const DashboardOrderDetail: FC<OrderDetailProps> = ({ order: { user, address, created_at, products, status, total, shipment, discount } }) => {

    const getPrice = () => {
        if (discount) {
          return (
            <>
              <span className="text-primary mr-2">
                - %{discount.percent} 
              </span>
              ${total - calcPercent(total, discount.percent)}
            </>
          )
        } else {
          return total
        }
      }

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
                Total: { getPrice() }
            </h3>
            <h3>
                Estado: { traduceOrderState(status) }
            </h3>
            <h3>
                Tipo De Envio: { shipment.name }
            </h3>
        </div>
        <div>
            <h2 className='text-2xl mb-5'>
                Direccion De Envio:
            </h2>
            <ul>
                <li>
                <h3 className='text-xl'>
                Direccion: { address.street }
            </h3>
                </li>
                <li>
                    <h3 className='text-xl'>
                        Estado: { address.state }
                    </h3>
                </li>
                <li>
                    <h3 className='text-xl'>
                        Codigo Postal: { address.postalCode }
                    </h3>
                </li>
                {
                    address.aparment ? <li>
                    <h3 className='text-xl'>
                        Estado: { address.aparment }
                    </h3>
                </li> : null
                }
                
            </ul>
            
        </div>
    </div>
  )
}
