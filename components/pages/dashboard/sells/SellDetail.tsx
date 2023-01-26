import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { ProductImage } from '../../../../models/product'
import { Review as ReviewType } from '../../../../models/review'
import { Sell } from '../../../../models/sell'
import { calcPercent } from '../../../../utilities/prices'
import { Review } from '../../../molecules/user/Review'

interface SellDetailProps {
    sell: Sell
}

export const SellDetail: FC<SellDetailProps> = ({ sell: { user, created_at, productReviews, review, shipment, total, address, discount, id } }) => {

    const router = useRouter();

    const getPrice = () => {
        const price = discount ? ((total - shipment.price) - calcPercent(total - shipment.price, discount.percent)) + shipment.price : total

        return price
    }

    return (
        <div>
            <div className='flex justify-between items-center py-3 md:px-0 px-3'>
                <h2 className='text-2xl'>
                    Venta
                </h2>
                <h3 className='text-2xl'>
                    {created_at}
                </h3>
            </div>
            <div>
                {
                    productReviews.map((productReview: ReviewType) => {
                        const { product: { images, name }, stars, count } = productReview;

                        return (
                            <div className='w-full p-5 flex border-t border-gray-200'>
                                <img src={images.find((i: ProductImage) => i.type === "MAIN")?.imageUrl} alt={name} className="w-[50px]" />
                                <div className='flex flex-col sm:flex-row justify-between w-full'>
                                    <div className='flex flex-col ml-5'>
                                        <h3 className='text-lg sm:text-xl'>
                                            {name}
                                        </h3>
                                        <div>
                                            {
                                                Array.from({ length: stars }).map((star, index) => <FontAwesomeIcon icon={faStar} className="text-primary mt-2" />)
                                            }
                                        </div>
                                        <div>
                                            Cantidad: {count}
                                        </div>
                                    </div>
                                    <div className='ml-5'>
                                        <h3 className='text-lg sm:text-xl'>
                                            Precio: ${total - shipment.price}
                                        </h3>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
            <div className='text-xl flex justify-between border-t border-gray-300 p-5'>
                <h3>
                    {user.name}
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
            <div className='p-5'>
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
            <div className="flex flex-col justify-between p-5 border-t border-gray-200">
                <h2 className='text-xl mb-5'>
                    Reseña
                </h2>

                <Review review={review} inmutable={true} />
            </div>
        </div>
    )
}
