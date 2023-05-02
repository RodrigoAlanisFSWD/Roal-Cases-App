import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Shipment } from '../../../../models/shipment'
import { deleteShipment } from '../../../../services/shipmentService'
import { Button } from '../../../atoms/shared/Button'
import { IconButton } from '../../../atoms/shared/IconButton'

interface ShipmentsProps {
  shipments: Shipment[]
}

export const Shipments: FC<ShipmentsProps> = ({ shipments }) => {

  const router = useRouter()

  return (
    <div>
      <h2 className='text-2xl sm:text-3xl mb-6'>
        Tipos De Envio
      </h2>
      {shipments.map((shipment: Shipment) => (
        <div className='w-full h-[60px] border-b border-gray-300 flex justify-between items-center' key={shipment.id}>
          <h2 className='text-2xl ml-5'>
            {shipment.name}
          </h2>
          <div className='flex items-center'>
            <span className='text-xl mr-5'>
              Precio: {shipment.price}
            </span>
            <IconButton icon={faEdit} color="primary" className='mr-2' onClick={() => router.push("/dashboard/shipments/" + shipment.id)} />
            <IconButton icon={faTrash} color="danger" onClick={async () => {
              await deleteShipment(shipment.id)
              router.push("/dashboard/shipments")
            }} />
          </div>
        </div>
      ))}

      <Button onClick={() => router.push("/dashboard/shipments/create")} text='Crear Tipo De Envio' className="w-full mt-6 sm:w-[250px]" />
    </div>
  )
}
