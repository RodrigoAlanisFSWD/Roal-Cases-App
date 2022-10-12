import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SubCategory } from '../../../models/category'
import { Product, ProductImage } from '../../../models/product'
import { StoreState } from '../../../store'

export const ProductsList = () => {

  const products = useSelector((store: StoreState) => store.products)

  return (
    <div className={`w-full h-[100%] m-auto grid grid-cols-2 sm:flex flex-wrap justify-center content-start py-5`}>
      {
        products.map((product: Product) => (
          
            <div key={product.id} className='w-auto h-auto flex flex-col items-center mx-5 mb-3'>
              <Link href={"/products/" + product.slug}>
                <img src={product.images.find((image: ProductImage) => image.type === "MAIN")?.imageUrl} alt={product.name} className="w-[100px]" />
              </Link>
            <h3 className='text-xl mt-2'>
              { product.name }
            </h3>

            <span className='mt-2 text-secondary'>
              ${ product.price }
            </span>
          </div>
          
        ))
      }
    </div>
  )
}
