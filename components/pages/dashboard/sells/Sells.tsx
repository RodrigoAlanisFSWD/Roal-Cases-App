import React, { FC } from 'react'
import { Sell as SellType } from '../../../../models/sell'
import { Sell } from '../../../molecules/dashboard/sells/Sell'

interface SellsProps {
    sells: SellType[]
}

export const Sells: FC<SellsProps> = ({ sells }) => {
  return (
    <div>
        <h2 className='text-2xl mb-5'>
            Ventas
        </h2>

        {
            sells.map((sell: SellType) => <Sell {...sell} key={sell.id} />)
        }
    </div>
  )
}
