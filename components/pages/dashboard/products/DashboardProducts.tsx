import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useProductService } from '../../../../services/productService'
import styles from '../../../../styles/pages/dashboard/products/DashboardProducts.module.scss'
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
    <div className={styles['products']}>
        <h2>
            Productos
        </h2>

        <ProductsList />

        <Button text="Crear Producto" className={styles['products__btn']} onClick={() => router.push("/dashboard/products/create")}/>
    </div>
  )
}
