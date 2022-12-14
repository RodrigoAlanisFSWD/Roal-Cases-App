import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'
import { setCart } from '../../../redux/states/cart'
import { getCart } from '../../../services/cartService'
import { createOrder } from '../../../services/ordersService'
import { Button } from '../../atoms/shared/Button'

export const AfterPayment: FC<any> = ({ payment }) => {

    const router = useRouter()
    
    const stripe = useStripe()

    const cookies = new Cookies()

    const dispatch = useDispatch()

    useEffect(() => {
        if (!stripe) return 
        cookies.remove("roal_cases/payment-intent", {
            domain: "localhost",
            path: "/",
          })

        const init = async () => {
            try {
                const intent = await stripe.retrievePaymentIntent(payment)

                const address = cookies.get("roal_cases/address-id")

                if (address) {
                    cookies.remove("roal_cases/address-id", {
                        domain: "localhost",
                        path: "/",
                      })
                    const order = await createOrder({
                        id: address
                    });
                    dispatch(setCart(await getCart()))
                }
            } catch (error) {
                console.log(error)
                router.push("/")
            }            
        }

        init()
    }, [stripe])

  return (
    <div className='w-2/5 h-auto shadow-lg rounded-sm p-5 flex flex-col justify-between items-center'>
                    <div className='w-[150px] h-[150px] rounded-full bg-primary flex justify-center items-center mb-5'>
                        <FontAwesomeIcon icon={faCheck} className="text-white text-5xl" />

                    </div>
                    <h2 className='text-2xl'>
                        Gracias Por Tu Compra!
                    </h2>
                    <div className='text-xl my-8 text-center'>
                        En Breves Te Llegara Un Email A Tu Correo Electronico Para Confirmar La Compra. Gracias Por Confiar En Nosotros!
                    </div>
                    <Button text="Continuar" onClick={() => router.push("/")} />
                </div>
  )
}
