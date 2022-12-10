import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { traduceOrderState } from '../../../../adapters/traductors'
import { Order } from '../../../../models/order'
import { Button } from '../../../atoms/shared/Button'

export const DashboardOrder: FC<Order> = ({ created_at, status, user, id }) => {

    const router = useRouter()

  return (
    <div className='w-full h-[55px] border-b border-gray-300 px-3 flex justify-between items-center'>
        <h3 className='text-2xl'>
            { created_at }
        </h3>

        <div className='flex w-auto items-center'>
            <span className='text-xl'>
                { user.name }
            </span>

            <span className='text-xl ml-5'>
                Estado: { traduceOrderState(status) }
            </span>

            <Button text='Ver Detalle' className="ml-5 w-[200px]" onClick={() => router.push("/dashboard/orders/" + id)} />
        </div>
    </div>
  )
}
