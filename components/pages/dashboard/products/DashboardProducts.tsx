import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '../../../atoms/shared/Button'
import { ProductsList } from '../../../organisms/dashboard/products/ProductsList'

export const DashboardProducts = () => {

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
