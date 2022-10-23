import React, { FC, useState } from 'react'
import { CartProduct as CartProductType } from '../../../models/cart'
import { ProductImage } from '../../../models/product'
import { Counter } from '../../atoms/shared/Counter'
import { MiniButton } from '../../atoms/shared/MiniButton'
import { editProductFromCart, removeProductFromCart } from '../../../services/cartService'
import { useDispatch } from 'react-redux'
import { editProductInCart, setCart } from '../../../redux/states/cart'

export const CartProduct: FC<CartProductType> = (props) => {

    const { product, model, count, id } = props;

    const dispatch = useDispatch()

    return (
        <div className='flex p-5 justify-start w-full'>
            <img src={product.images.find((image: ProductImage) => image.type === "MAIN")?.imageUrl} className="w-[75px]" />
            <div className='flex ml-10 py-1'>
                <div className='flex flex-col h-full justify-between'>
                    <div>
                        <h3 className='font-bold text-lg'>
                            {product.name}
                        </h3>
                        <h4>
                            {model.name}
                        </h4>
                    </div>

                    <Counter count={count} setCount={async (newCount) => {
                        const edited = await editProductFromCart(newCount, props)

                        dispatch(setCart(edited))
                    }} />
                </div>
                <div className='ml-5 flex flex-col justify-between'>
                    <MiniButton text="Eliminar" onClick={async () => {
                        console.log(id)
                        const newCart = await removeProductFromCart(id)

                        dispatch(setCart(newCart))
                    }} />
                    <span className='text-xl mb-3'>
                        ${ product.price }
                    </span>
                </div>
            </div>

        </div>
    )
}
