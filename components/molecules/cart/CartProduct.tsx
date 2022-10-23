import React, { FC, useState } from 'react'
import { CartProduct as CartProductType } from '../../../models/cart'
import { ProductImage } from '../../../models/product'
import { Counter } from '../../atoms/shared/Counter'
import { MiniButton } from '../../atoms/shared/MiniButton'
import { editProductFromCart, removeProductFromCart } from '../../../services/cartService'
import { useDispatch } from 'react-redux'
import { editProductInCart, setCart } from '../../../redux/states/cart'
import Link from 'next/link'

export const CartProduct: FC<CartProductType> = (props) => {

    const { product, model, count, id } = props;

    const dispatch = useDispatch()

    return (
        <div className='flex p-5 justify-center sm:justify-start w-full'>
            <img src={product.images.find((image: ProductImage) => image.type === "MAIN")?.imageUrl} className="w-[75px]" />
            <div className='flex ml-10 py-1'>
                <div className='flex flex-col h-full justify-between'>
                    <div>
                        <div className='flex'>
                            <Link href={"/products/" + product.slug}>
                                <h3 className='font-bold text-lg cursor-pointer'>
                                    {product.name}
                                </h3>
                            </Link>

                            <span className='block sm:hidden text-xl sm:mb-3 ml-2'>
                                ${product.price}
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <h4>
                                {model.name}
                            </h4>

                            <MiniButton className="block sm:hidden mt-2 ml-2" text="Eliminar" onClick={async () => {
                                console.log(id)
                                const newCart = await removeProductFromCart(id)

                                dispatch(setCart(newCart))
                            }} />
                        </div>

                    </div>

                    <Counter count={count} setCount={async (newCount) => {
                        const edited = await editProductFromCart(newCount, props)

                        dispatch(setCart(edited))
                    }} />
                </div>
                <div className='ml-5 flex flex-col justify-between'>
                    <MiniButton className="hidden sm:block" text="Eliminar" onClick={async () => {
                        console.log(id)
                        const newCart = await removeProductFromCart(id)

                        dispatch(setCart(newCart))
                    }} />
                    <span className='hidden sm:block text-xl mb-3'>
                        ${product.price}
                    </span>
                </div>
            </div>

        </div>
    )
}
