import React from 'react'
import { useSelector } from 'react-redux'
import { Product } from '../../../../models/product';
import { AppStore } from '../../../../redux/store';
import { DashbordProduct } from '../../../molecules/dashboard/products/DashbordProduct';

export const ProductsList = () => {

    const products = useSelector((store: AppStore) => store.products);

  return (
    <div>
        {
            products.map((product: Product) => <DashbordProduct key={product.id} {...product} /> )
        }
    </div>
  )
}
