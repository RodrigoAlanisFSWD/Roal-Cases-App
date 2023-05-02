import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Order as OrderType } from '../../../models/order'
import { AppStore } from '../../../redux/store'
import { getOrders } from '../../../services/ordersService'
import { Alert } from '../../atoms/shared/Alert'
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
        <div className='max-w-[750px] h-[calc(100vh-100px)] sm:h-auto w-full flex flex-col justify-start items-center'>
          <div className='w-full h-[50px] sm:shadow-lg flex justify-between items-center px-5 border-b border-gray'>
            <h2 className='text-2xl'>
              {user?.name}
            </h2>

            <h3 className='text-xl'>
              {user?.email}
            </h3>
          </div>
          <div className='w-full min-h-[400px] bg-white sm:shadow-lg p-5'>
            <h2 className='text-2xl'>
              Pedidos
            </h2>

            <div>
              {
                orders.map((order: OrderType) => <Order key={order.id} {...order} />)
              }
              {
                orders.length < 1 ? <Alert text='No Hay Ordenes Activas' className='mt-5'/> : null
              }
            </div>
          </div>
      </div>

    </Main>
  )
}
