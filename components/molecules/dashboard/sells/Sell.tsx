import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Sell as SellType } from '../../../../models/sell'
import { Button } from '../../../atoms/shared/Button'

export const Sell: FC<SellType> = ({ created_at, total, user, id }) => {

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
                Total: { total }
            </span>

            <Button text='Ver Detalle' className="ml-5 w-[200px]" onClick={() => router.push("/dashboard/sells/" + id)} />
        </div>
    </div>
  )
}
