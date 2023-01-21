import React, { FC, useState } from 'react'
import { traduceOrderState } from '../../../../adapters/traductors'
import { Order, OrderProduct, OrderStatus } from '../../../../models/order'
import { SelectItemType } from '../../../../models/select'
import { calcPercent } from '../../../../utilities/prices'
import { OrderDetailProduct } from '../../../molecules/user/OrderDetailProduct'
import { Select } from '../../../molecules/shared/Select'
import { Button } from '../../../atoms/shared/Button'
import { updateOrder } from '../../../../services/ordersService'
import { useRouter } from 'next/router'

interface OrderDetailProps {
    order: Order
}

export const DashboardOrderDetail: FC<OrderDetailProps> = ({ order }) => {

    const { user, address, created_at, products, status, total, shipment, discount } = order

    const orderStates: SelectItemType[] = [
        {
            key: "PAID",
            text: "Pagado"
        },
        {
            key: "CONFIRMED",
            text: "Confirmado"
        },
        {
            key: "DELIVERED",
            text: "Enviado"
        },
    ]

    const [selectedState, setSelectedState] = useState<SelectItemType | null>(null)

    const router = useRouter();

    const getPrice = () => {
        const price = discount ? ((total - shipment.price) - calcPercent(total - shipment.price, discount.percent)) + shipment.price : total

        return price
    }

    return (
        <div>
            <div className='flex justify-between items-center border-b border-gray-300 py-3 md:px-0 px-3'>
                <h2 className='text-2xl'>
                    Orden De: {user.name}
                </h2>
                <h3 className='text-2xl'>
                    {created_at}
                </h3>
            </div>
            <div>
                {
                    products.map((product: OrderProduct) => <OrderDetailProduct key={product.id} {...product} />)
                }
            </div>
            <div className='text-xl flex justify-between border-t border-gray-300 p-5'>
                <h3>
                    Estado: {traduceOrderState(status)}
                </h3>
                <h3>
                    Tipo De Envio: {shipment.name}
                </h3>
            </div>
            
            <div className="p-5 border-b border-t border-gray-200 w-full">
                <div className="flex justify-between mb-4">
                    <h3 className="text-xl">Precio:</h3>
                    <h3 className="text-xl">{
                        discount ?
                            (
                                <>
                                    ${total + ' '}
                                    <span className="text-primary mr-2">
                                        - %{discount.percent}
                                    </span>
                                </>
                            ) : total
                    }</h3>
                </div>
                <div className="flex justify-between">
                    <h3 className="text-xl">Envio:</h3>
                    <h3 className="text-xl">${shipment?.price || 0}</h3>
                </div>
            </div>
            <div className="flex justify-between p-5 border-b border-gray-200">
                <h3 className="text-xl">Total:</h3>
                <h3 className="text-xl">
                    ${getPrice()}
                </h3>
            </div>
            <div className='flex md:flex-row flex-col p-5'>
                <Select items={orderStates.filter((state: SelectItemType) => state.key !== status)} placeholder="Estado" selectedItem={selectedState} onSelect={(item) => setSelectedState(item)} width="w-full md:w-[400px] lg:w-[600px]" className='w-full md:w-[400px] lg:w-[600px]' />
                <Button text='Actualizar' className="md:ml-5 md:mt-0 mt-5 h-[55px] w-full md:w-[232px]" onClick={async () => {
                    if (selectedState) {
                        const updated = await updateOrder({
                            ...order,
                            status: selectedState.key as OrderStatus,
                        })

                        router.push("/dashboard/orders/" + order.id)
                    }
                }} />
            </div>
            <div className='p-5 border-t border-gray-200'>
                <h2 className='text-xl mb-5'>
                    Direccion De Envio:
                </h2>
                <ul>
                    <li>
                        <h3 className='text-xl'>
                            Direccion: {address.street}
                        </h3>
                    </li>
                    <li>
                        <h3 className='text-xl'>
                            Estado: {address.state}
                        </h3>
                    </li>
                    <li>
                        <h3 className='text-xl'>
                            Codigo Postal: {address.postalCode}
                        </h3>
                    </li>
                    {
                        address.aparment ? <li>
                            <h3 className='text-xl'>
                                Estado: {address.aparment}
                            </h3>
                        </li> : null
                    }

                </ul>

            </div>
        </div>
    )
}
