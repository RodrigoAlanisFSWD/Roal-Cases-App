import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Discount } from '../../../../models/discount'
import { deleteDiscount } from '../../../../services/discountService'
import { deleteShipment } from '../../../../services/shipmentService'
import { Button } from '../../../atoms/shared/Button'
import { IconButton } from '../../../atoms/shared/IconButton'

interface DiscountsProps {
  discounts: Discount[]
}

export const Discounts: FC<DiscountsProps> = ({ discounts }) => {

  const router = useRouter()

  return (
    <div>
      <h2 className='text-2xl sm:text-3xl mb-6'>
        Tipos De Envio
      </h2>
      {discounts.map((discount: Discount) => (
        <div className='w-full h-[60px] border-b border-gray-300 flex justify-between items-center' key={discount.id}>
          <h2 className='text-2xl ml-5'>
            {discount.code}
          </h2>
          <div className='flex items-center'>
            <span className='text-xl mr-5'>
              Porcentaje: %{discount.percent}
            </span>
            <IconButton icon={faEdit} color="primary" className='mr-2' onClick={() => router.push("/dashboard/discounts/" + discount.code)} />
            <IconButton icon={faTrash} color="danger" onClick={async () => {
              await deleteDiscount(discount.id)
              router.push("/dashboard/discounts")
            }} />
          </div>
        </div>
      ))}

      <Button onClick={() => router.push("/dashboard/discounts/create")} text='Crear Tipo De Envio' className="w-full mt-6 sm:w-[250px]" />
    </div>
  )
}
