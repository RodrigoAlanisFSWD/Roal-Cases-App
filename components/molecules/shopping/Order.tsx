import Link from 'next/link'
import React, { FC } from 'react'
import { Order as OrderType } from '../../../models/order'
import { Button } from '../../atoms/shared/Button'

export const Order: FC<OrderType> = ({ created_at, total, status, id }) => {
    return (
        <div className='border-b border-gray-300 h-[50px] flex justify-between items-center px-3'>
            <h3 className='text-xl'>
                {created_at}
            </h3>
            <div className='flex justify-end w-2/4 items-center'>
                <span className='text-lg'>
                    Total: ${total}
                </span>
                <span className='text-lg ml-4'>
                    Stado: {status}
                </span>
                <Link href={"/user/orders/" + id} className="h-[40px] flex items-center justify-center px-4 hover:bg-[#89a3c622] ml-5 transition-all duration-300">
                    <span className='text-primary text-xl bg-opacity-0 block rounded-sm text-center'>
                        Ver Mas
                    </span>
                </Link>
            </div>
        </div>
    )
}
