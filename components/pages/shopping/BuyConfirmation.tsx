import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Address } from '../../../models/address'
import { CartProduct } from '../../../models/cart'
import { ProductImage } from '../../../models/product'
import { confirmCart } from '../../../redux/states/cart'
import { setSelectedAddress } from '../../../redux/states/payment'
import { AppStore } from '../../../redux/store'
import { Alert } from '../../atoms/shared/Alert'
import { Button } from '../../atoms/shared/Button'
import { Main } from '../../layouts/Main'
import { Addresses } from '../../organisms/shopping/Addresses'


export const BuyConfirmation = () => {

  const cart = useSelector((store: AppStore) => store.cart)

  const calcTax = (): number => {
    const percent = (cart.totalCost + 75) / 100

    return percent * 3
  }

  const [address, setAddress] = useState<Address | null>(null)
  const [error, setError] = useState("")

  const router = useRouter()

  const dispatch = useDispatch();

  return (
    <Main>
      <div className='w-full max-h-full min-h-[calc(100vh-100px)] grid grid-cols-1 md:grid-cols-[1fr_300px]'>
        <div className='md:p-5'>
          <Addresses selected={address} onChange={(newAddress: Address) => {
            if (address?.id === newAddress.id) {
                setAddress(null)
            } else {
              setAddress(newAddress)
            }
          }} />
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
            <Button text='Continuar Con La Compra' onClick={() => { 
              if (cart.products.length < 1) {
                setError("No Tienes Productos En El Carrito")
                return
              }
              if (!address) {
                setError("Selecciona Una Direccion")
                return
              }
            
              dispatch(confirmCart())
              dispatch(setSelectedAddress(address))

              router.push("/shopping/payment")
            }
            } />
            {
              error.length > 1 && <Alert text={error} className='mt-5' />
            }
            
          </div>
        </div>

      </div>
    </Main>
  )
}
