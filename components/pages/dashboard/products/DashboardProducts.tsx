import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useProductService } from '../../../../services/productService'
import { Button } from '../../../atoms/shared/Button'
import { ProductsList } from '../../../organisms/dashboard/products/ProductsList'

export const DashboardProducts = () => {

    const { getProducts } = useProductService();

    useEffect(() => {
        const init = async () => {
            await getProducts();
        }

        init()
    })

    const router = useRouter();

  return (
    <div>
        <h2 className='text-2xl sm:text-3xl mb-6'>
            Productos
        </h2>

        <ProductsList />

        <Button text="Crear Producto" className="w-full mt-6 sm:w-[250px]" onClick={() => router.push("/dashboard/products/create")}/>
    </div>
  )
}
