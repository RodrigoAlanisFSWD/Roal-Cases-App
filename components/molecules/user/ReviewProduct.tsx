import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { useImage } from '../../../hooks/useImage'
import { OrderProduct } from '../../../models/order'
import { Product, ProductImage } from '../../../models/product'

interface ReviewProductProps extends OrderProduct {
    addReview: (product: any, stars: number) => void
}

export const ReviewProduct: FC<ReviewProductProps> = ({ count, model, product, addReview, id }) => {

    const { images, price, name } = product

    const stars = [
        0,
        0,
        0,
        0,
        0
    ]

    const [starsSelected, setStarsSelected] = useState(0)

    const selectStars = (stars: number) => {
        setStarsSelected(stars)

        addReview({
            id,
            product,
            count
        }, stars)
    }

    return (
        <div className='w-full p-5 flex border-t border-gray-200'>
            <Image src={useImage(images.find((image: ProductImage) => image.type === "MAIN")?.imageUrl as string)} className="w-[50px]" width="50" height="100" alt={name} />
            <div className='flex flex-col sm:flex-row justify-between w-full'>
                <div className='flex flex-col ml-5'>
                    <h3 className='text-lg sm:text-xl'>
                        {name}
                    </h3>
                    <div>
                        {
                            stars.map((value: number, index: number) => (
                                <FontAwesomeIcon onClick={() => selectStars(index + 1)} icon={faStar} className={index + 1 <= starsSelected ? 'text-primary' : 'text-gray-300'} />
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
