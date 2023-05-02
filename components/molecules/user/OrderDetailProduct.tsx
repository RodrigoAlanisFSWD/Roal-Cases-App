import Image from 'next/image'
import React, { FC } from 'react'
import { OrderProduct } from '../../../models/order'
import { ProductImage } from '../../../models/product'

export const OrderDetailProduct: FC<OrderProduct> = ({ count, model, product: { images, price, name } }) => {
    return (
        <div className='w-full p-5 flex'>
            <Image src={images.find((image: ProductImage) => image.type === "MAIN")?.imageUrl as string} className="w-[100px]" width="100" height="100" alt={name} />
            <div className='flex flex-col sm:flex-row justify-between w-full'>
                <div className='flex flex-col ml-5'>
                    <h3 className='text-xl sm:text-2xl'>
                        {name}
                    </h3>
                    <span className='text-md sm:text-lg'>
                        Modelo: {model.name}
                    </span>

                    <span className='mt-2 text-xl'>
                        Cantidad: {count}
                    </span>
                </div>
                <div className='ml-5 mb-2'>
                    <h3 className='text-lg sm:text-xl sm:mt-2'>
                        Precio: ${price}
                    </h3>
                </div>
            </div>

        </div>
    )
}
