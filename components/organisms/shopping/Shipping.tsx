import React, { FC, useEffect, useState } from 'react'
import { Shipment } from '../../../models/shipment'
import { getShipments } from '../../../services/shipmentService'
import { CheckBox } from '../../atoms/shared/CheckBox'

interface ShippingProps {
    selected: Shipment | null;
    onChange: (shipment: Shipment) => void;
}

export const Shipping: FC<ShippingProps> = ({ selected, onChange }) => {

    const [shipments, setShipments] = useState<Shipment[]>([])


    useEffect(() => {
        const init = async () => {
            setShipments(await getShipments())
        }

        init()
    }, [])

    return (
        <div className='w-full h-auto min-h-[50px] border-b border-gray-200 p-5'>
            <h2 className='text-xl'>
                Envio:
            </h2>
            {
                shipments.map((shipment: Shipment) => (
                    <div key={shipment.id} className='flex justify-between items-center h-[55px]'>
                        <div className='flex'>
                            <CheckBox isActive={selected?.id === shipment.id} onChange={() => onChange(shipment)} />
                            <h3 className='ml-5'>
                                {shipment.name}
                            </h3>
                        </div>

                        <span>
                            ${shipment.price}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}
