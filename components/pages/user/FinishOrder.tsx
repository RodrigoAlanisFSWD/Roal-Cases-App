import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { Order, OrderProduct } from '../../../models/order'
import { Button } from '../../atoms/shared/Button'
import { YesOrNo } from '../../atoms/shared/YesOrNo'
import { OrderDetailProduct } from '../../molecules/user/OrderDetailProduct'
import { ReviewProduct } from '../../molecules/user/ReviewProduct'

interface FinishOrderProps {
    order: Order
}

export const FinishOrder: FC<FinishOrderProps> = ({ order }) => {

    const { products } = order

    return (
        <div className='min-h-[calc(100vh-100px)] w-full shadow-lg grid grid-cols-12'>
            <div className='col-span-4 w-full border-r border-gray-200'>
                <h2 className='text-2xl m-5'>
                    Reseñas
                </h2>
                <div>
                    {
                        products.map((product: OrderProduct) => <ReviewProduct {...product} key={product.id} />)
                    }
                </div>
            </div>
            <div className='col-span-8'>
                <h2 className='text-2xl p-5'>
                    Finalizar Orden
                </h2>
                <div className='w-full p-5 text-xl flex items-center'>
                    <h3 className='mr-5'>
                        Tu pedido llego en el tiempo estimado ?
                    </h3>
                    <YesOrNo />
                </div>
                <div className='w-full p-5 text-xl flex items-center'>
                    <h3 className='mr-5'>
                        Tu pedido llego en buenas condiciones ?
                    </h3>
                    <YesOrNo />
                </div>
                <div className='w-full p-5 text-xl flex items-center'>
                    <h3 className='mr-5'>
                        Tu pedido es lo que esperabas ?
                    </h3>
                    <YesOrNo />
                </div>
                <div className='w-full p-5 text-xl flex items-center'>
                    <h3 className='mr-5'>
                        La app funciono de manera satisfactoria ?
                    </h3>
                    <YesOrNo />
                </div>
                <div className='p-5 text-xl'>
                    <h3>
                        Tienes algun comentario extra ?
                    </h3>
                    <div
                        className={`w-full min-h-[100px] items-start p-2 bg-white border rounded-sm flex mt-5`}
                    >
                        <textarea placeholder="Comentarios" name="textarea" className="text-xl placeholder:text-secondary resize-none w-11/12 outline-none" />
                    </div>
                    <Button text='Finalizar' className="mt-5 w-full sm:w-[350px]" />
                </div>
            </div>
        </div>
    )
}
