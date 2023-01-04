import { PaymentElement } from '@stripe/react-stripe-js';
import Image from 'next/image';
import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux';
import { CartProduct } from '../../../models/cart';
import { ProductImage } from '../../../models/product';
import { AppStore } from '../../../redux/store';
import { calcPercent } from '../../../utilities/prices';
import { Alert } from '../../atoms/shared/Alert';
import { Button } from '../../atoms/shared/Button';

interface PaymentUIProps {
    submit: () => void;
    errorMessage: string | null;
}

export const PaymentUI: FC<PaymentUIProps> = ({ submit, errorMessage }) => {

    const { selectedShipment, selectedDiscount } = useSelector((store: AppStore) => store.payment)

    const cart = useSelector((store: AppStore) => store.cart)

    const [paymentFilled, setPaymentFilled] = useState(false)

    const getPrice = () => {
        const price = selectedShipment ? cart.totalCost + selectedShipment?.price : cart.totalCost
        if (selectedDiscount) {
          return (
            <>
              <span className="text-primary mr-2">
                - %{selectedDiscount.percent} 
              </span>
              ${price - calcPercent(price, selectedDiscount.percent)}
            </>
          )
        } else {
          return price
        }
      }

  return (
    <div className='w-full h-[calc(100vh-100px)] grid grid-cols-[60%_40%]'>
            <div className='p-12'>
                <h2 className='text-2xl mb-5'>
                    Datos De La Compra
                </h2>
                <div className="flex flex-wrap border-t border-gray-200">
                    {cart.products.map((product: CartProduct, index) => (
                        <div
                            key={product.id}
                            className='flex border-b border-gray-200 p-5 w-full'
                        >
                            <Image
                                width="50"
                                height="100"
                                src={
                                    product.product.images.find(
                                        (img: ProductImage) => img.type === "MAIN"
                                    )?.imageUrl || ""
                                }
                                alt={product.product.name}
                                className="w-[50px]"
                            />
                            <div className="ml-5">
                                <h3 className="text-xl">{product.product.name}</h3>
                                <h3>${product.product.price * product.count}</h3>
                                <h3>Cantidad: {product.count}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-5 border-b border-gray-200 w-full">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-xl">Precio:</h3>
                        <h3 className="text-xl">${cart?.totalCost}</h3>
                    </div>
                    <div className="flex justify-between">
                        <h3 className="text-xl">Envio:</h3>
                        <h3 className="text-xl">${selectedShipment?.price || 0}</h3>
                    </div>
                </div>
                <div className="flex justify-between p-5 border-b border-gray-200">
                    <h3 className="text-xl">Total:</h3>
                    <h3 className="text-xl">
                        { getPrice() }
                    </h3>
                </div>
            </div>
            <div className="w-full p-12 flex flex-col">
                <h2 className="text-2xl mb-5">Pago Con Targeta</h2>
                <PaymentElement
                    onChange={(event) => {
                        setPaymentFilled(event.complete);
                    }}
                    className="w-full mb-5"
                />
                <Button
                    text="Confirmar"
                    className="mt-8 w-full"
                    disabled={!paymentFilled}
                    onClick={submit}
                />
                {
                    errorMessage ? <Alert text={errorMessage} /> : null
                }
            </div>
        </div>
  )
}
