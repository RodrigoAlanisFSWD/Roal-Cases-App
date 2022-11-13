import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Order as OrderType } from '../../../models/order'
import { AppStore } from '../../../redux/store'
import { getOrders } from '../../../services/ordersService'
import { Main } from '../../layouts/Main'
import { Order } from '../../molecules/shopping/Order'

export const UserInfo = () => {

  const user = useSelector((store: AppStore) => store.auth.profile)

  const [orders, setOrders] = useState<OrderType[]>([])

  useEffect(() => {
      const init = async () => {
       setOrders(await getOrders())
      }

      init()
  }, [])

  return (
    <Main>
        <div className='max-w-[750px] h-full w-full flex flex-col justify-start items-center'>
            <div className='w-full h-[50px] shadow-lg flex justify-between items-center px-5 border-b border-gray'>
              <h2 className='text-2xl'>
                { user?.name }
              </h2>

              <h3 className='text-xl'>
                { user?.email }
              </h3>
            </div>
            <div className='w-full min-h-[400px] bg-white shadow-lg p-5'>
              <h2 className='text-2xl'>
                Pedidos
              </h2>

              <div>
                {
                  orders.map((order: OrderType) => <Order key={order.id} {...order} />)
                }
              </div>
            </div>
        </div>
    </Main>
  )
}
