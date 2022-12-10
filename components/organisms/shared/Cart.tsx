import { faChevronLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';
import { CartProduct as CartProductType } from '../../../models/cart';
import { CartProduct } from '../../molecules/cart/CartProduct';
import { Button } from '../../atoms/shared/Button';
import products from '../../../redux/states/products';
import { useRouter } from 'next/router';
import { Protected } from '../../layouts/Protected';
import { Alert } from '../../atoms/shared/Alert';

interface CartProps {
    handleClose: () => void;
}

export const Cart: FC<CartProps> = ({ handleClose }) => {

    const cart = useSelector((store: AppStore) => store.cart)

    const router = useRouter();

    return (
        <Protected>
            <div className="top-0 fixed w-screen h-screen bg-modalBlack backdrop-blur-sm flex z-[10000000] justify-end items-center">
                <motion.div
                    initial={{ translateX: "100%" }}
                    animate={{ translateX: 0 }}
                    exit={{ translateX: "100%" }}
                    transition={{ duration: 0.3 }}
                    className='bg-white w-full sm:w-[500px] h-screen overflow-y-scroll flex flex-col items-center'>
                    <div className='w-full flex flex-col items-center'>
                        <div className='flex flex-start w-full items-center justify-center p-5'>
                            <FontAwesomeIcon onClick={handleClose} icon={faChevronLeft} className="absolute mr-[80%] sm:mr-[400px] text-xl" />
                            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl text-dark" />
                        </div>
                        <div className='w-11/12 h-[5px] bg-background rounded-md'>

                        </div>
                    </div>

                    <div className='w-full p-5 px-0 sm:px-10'>
                        {
                            cart.products.length < 1 ? (
                                <Alert text='No Hay Productos En El Carrito' className='sm:mx-0 mx-5' />
                            ) : null
                        }
                        {
                            cart.products.map((product: CartProductType) => (<CartProduct key={product.id} {...product} />))
                        }
                    </div>
                    <div className='px-5 sm:px-10 w-full border-t border-gray-200 pt-5'>
                        <div className='flex justify-between w-full mb-5'>
                            <span className='text-xl'>
                                Subtotal
                            </span>

                            <span className='text-xl'>
                                ${cart.totalCost}
                            </span>
                        </div>
                        {
                            products.length < 1 &&
                            <div className='flex justify-between w-full mb-5'>
                                <span className='text-xl'>
                                    Envio
                                </span>

                                <span className='text-xl'>
                                    $75 Aprox
                                </span>
                            </div>
                        }

                        <div className='flex justify-between w-full mb-5'>
                            <span className='text-xl'>
                                Total
                            </span>

                            <span className='text-xl'>
                                ${cart.totalCost + (products.length < 1 ? 75 : 0)}
                            </span>
                        </div>
                        
                        <Button text="Continuar Con La Compra" onClick={() => router.push("/shopping/confirmation")} disabled={cart.products.length < 1} />
                    </div>
                    <div className='bg-background w-full h-[50px] flex justify-center items-center mt-5 text-lg'>
                        Con Esta Compra Adquiriras Puntos!
                    </div>

                </motion.div>
            </div>
        </Protected>

    )
}
