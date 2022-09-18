import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard';
import { ProductForm } from '../../../components/pages/dashboard/products/ProductForm';
import { Product } from '../../../models/product';
import { useCategoryService } from '../../../services/categoryService';
import { useProductService } from '../../../services/productService';

const EditProductPage = () => {
    const router = useRouter();

    const { id } = router.query

    const { getProduct } = useProductService()

    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        const init = async () => {
            setProduct(await getProduct(id as any))
        }

        if (id) {
            init()
        }

    }, [id])


  return product && (
    <Dashboard>
        <ProductForm edit={true} product={product} />
    </Dashboard>
  )
}

export default EditProductPage;