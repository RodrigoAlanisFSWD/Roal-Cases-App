import React, { FC } from 'react'
import { OrderProduct } from '../../../models/order'
import { ProductImage } from '../../../models/product'

export const OrderDetailProduct: FC<OrderProduct> = ({ count, model, product: { images, price, name } }) => {
    return (
        <div className='w-full p-5 flex'>
            <img src={images.find((i: ProductImage) => i.type === "MAIN")?.imageUrl} alt={name} className="w-[100px]" />
            <div className='flex justify-between w-full'>
                <div className='flex flex-col ml-5'>
                    <h3 className='text-2xl font-bold'>
                        {name}
                    </h3>
                    <span className='text-lg'>
                        Modelo: {model.name}
                    </span>

                    <span className='mt-2 text-xl'>
                        Cantidad: {count}
                    </span>
                </div>
                <div>
                    <h3 className='text-xl font-bold mt-2'>
                        Precio: ${price}
                    </h3>
                </div>
            </div>

        </div>
    )
}
