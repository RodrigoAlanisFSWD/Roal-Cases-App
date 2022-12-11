import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Address } from '../../../models/address'
import { CartProduct } from '../../../models/cart'
import { ProductImage } from '../../../models/product'
import { confirmCart } from '../../../redux/states/cart'
import { setSelectedAddress, setStatus } from '../../../redux/states/payment'
import { AppStore } from '../../../redux/store'
import { Alert } from '../../atoms/shared/Alert'
import { Button } from '../../atoms/shared/Button'
import { Main } from '../../layouts/Main'
import { Addresses } from '../../organisms/shopping/Addresses'
import Cookies from 'universal-cookie'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CheckBox } from '../../atoms/shared/CheckBox'
import * as types from '../../../redux/types/payment'

export const BuyConfirmation = () => {

  const stripe = useStripe()
  const elements = useElements();

  const cookies = new Cookies()

  const cart = useSelector((store: AppStore) => store.cart)

  const calcTax = (): number => {
    const percent = (cart.totalCost + 75) / 100

    return percent * 3
  }

  const [address, setAddress] = useState<Address | null>(null)
  const [error, setError] = useState("")

  const [confirmations, setConfirmations] = useState({
    address: false,
    payment: false,
  })

  const [paymentFilled, setPaymentFilled] = useState(false)

  const router = useRouter()

  const dispatch = useDispatch();

  useEffect(() => {
    cookies.remove("roal_cases/address-id")
  }, [])

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const key = useSelector((store: AppStore) => store.payment.clientSecret)

  return (
    <Main>
      <div className='w-full max-h-full min-h-[calc(100vh-100px)] grid grid-cols-1 md:grid-cols-[1fr_300px]'>
        <div className='md:p-5'>
          <Addresses selected={address} onChange={(newAddress: Address) => {
            if (address?.id === newAddress.id) {
              setAddress(null)
              setConfirmations({
                ...confirmations,
                address: false
              })
            } else {
              setAddress(newAddress)
              setConfirmations({
                ...confirmations,
                address: true
              })
            }
          }} />
          <div className='sm:w-3/5 w-full p-5 flex flex-col'>
            <h2 className='text-xl mb-5'>
              Pago
            </h2>
            <PaymentElement onChange={(event) => {
              if (event.complete) {
                setPaymentFilled(true)
              } else {
                setPaymentFilled(false)
              }
            }} className='w-full' />
            <Button text="Confirmar" className="mt-8 w-[250px]" disabled={!paymentFilled} onClick={() => {
              setConfirmations({
                ...confirmations,
                payment: true
              })
            }} />
          </div>
        </div>
        <div className='bg-white shadow-md border flex flex-col'>
          <h2 className='text-2xl border-b border-gray-200 w-full p-5'>
            Resumen Del Pedido
          </h2>
          <div className='p-5 border-b border-gray-200 w-full'>
            <div className='flex justify-between mb-4'>
              <h3 className='text-xl'>
                Precio:
              </h3>
              <h3 className='text-xl'>
                ${cart?.totalCost}
              </h3>
            </div>
            <div className='flex justify-between mb-4'>
              <h3 className='text-xl'>
                Envio:
              </h3>
              <h3 className='text-xl'>
                $75.00
              </h3>
            </div>
            <div className='flex justify-between'>
              <h3 className='text-xl'>
                Impuesto:
              </h3>
              <h3 className='text-xl'>
                ${calcTax()}
              </h3>
            </div>
          </div>
          <div className='flex justify-between p-5 border-b border-gray-200'>
            <h3 className='text-xl'>
              Total:
            </h3>
            <h3 className='text-xl'>
              ${calcTax() + cart.totalCost + 75}
            </h3>
          </div>

          <div>
            {cart.products.map((product: CartProduct) => (
              <div className='flex border-b border-gray-200 p-5'>
                <img src={product.product.images.find((img: ProductImage) => img.type === "MAIN")?.imageUrl} alt={product.product.name} className="w-[50px]" />
                <div className='ml-5'>
                  <h3 className='text-xl'>
                    {product.product.name}

                  </h3>
                  <h3>
                    ${product.product.price * product.count}
                  </h3>
                  <h3>
                    Cantidad: {product.count}
                  </h3>
                </div>

              </div>
            ))}
          </div>
          <div className='p-5'>
            <div className='mb-5'>
              <div className='flex items-center mb-2'>
                <CheckBox isActive={confirmations.address} onChange={() => { }} />
                <span className='ml-2'>
                  Direccion
                </span>
              </div>
              <div className='flex items-center'>
                <CheckBox isActive={confirmations.payment} onChange={() => { }} />
                <span className='ml-2'>
                  Metodo De Pago
                </span>
              </div>
            </div>
            <Button text='Continuar Con La Compra' onClick={async () => {
              if (cart.products.length < 1) {
                setError("No Tienes Productos En El Carrito")
                return
              }
              if (!confirmations.address) {
                setError("Selecciona Una Direccion")
                return
              }

              if (!confirmations.payment) {
                setError("Ingresa El Metodo De Pago")
                return
              }

              if (!address || !stripe || !elements) return

              console.log(key);

              cookies.set("roal_cases/payment-intent", key, {
                domain: "localhost",
                path: "/",
                // expires: new Date(Date.now() + 60 * 1)
              })

              const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                  return_url: "http://localhost:3000/shopping/after-payment"
                },
                redirect: "if_required"
              })

              if (error && error.message) {
                setErrorMessage(error.message)
                return
              }

              dispatch(confirmCart())
              dispatch(setSelectedAddress(address))
              dispatch(setStatus(types.SUCCESS))

              router.push("/shopping/after-payment?payment_intent_client_secret=" + key)

            }
            } />
            {
              error.length > 1 && <Alert text={error} className='mt-5' />
            }
            {
              errorMessage && <Alert text="Surgio Un Error En El Pago" className='mt-5' />
            }

          </div>
        </div>

      </div>
    </Main>
  )
}
