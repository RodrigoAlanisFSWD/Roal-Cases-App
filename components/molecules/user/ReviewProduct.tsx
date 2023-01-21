import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useState } from 'react'
import { OrderProduct } from '../../../models/order'
import { Product, ProductImage } from '../../../models/product'

export const ReviewProduct: FC<OrderProduct> = ({ count, model, product: { images, price, name } }) => {

    const stars = [
        0,
        0,
        0,
        0,
        0
    ]

    const [starsSelected, setStarsSelected] = useState(0)

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
                            stars.map((value: number, index: number) => (
                                <FontAwesomeIcon onClick={() => setStarsSelected(index + 1)} icon={faStar} className={index + 1 <= starsSelected ? 'text-primary' : 'text-gray-300'} />
                            ))
                        }
                    </div>
                </div>
                <div className='ml-5'>
                    <h3 className='text-lg sm:text-xl'>
                        Precio: ${price}
                    </h3>
                </div>
            </div>

        </div>
    )
}
