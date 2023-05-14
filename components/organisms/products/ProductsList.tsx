import { getImageSize } from 'next/dist/server/image-optimizer'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { useImage } from '../../../hooks/useImage'
import { Product, ProductImage } from '../../../models/product'
import { AppStore } from '../../../redux/store'

export const ProductsList = () => {

  const products = useSelector((store: AppStore) => store.products)

  return products && (
    <div className={`w-full h-[100%] m-auto grid grid-cols-2 sm:flex flex-wrap justify-center content-start py-5`}>
      {
        products.map((product: Product) => (
          <Link href={"/products/" + product.slug} className="cursor-pointer">
            <div key={product.id} className='w-auto h-auto flex flex-col items-center mx-5 mb-3'>
                <img src={product.images ? useImage(product.images.find((image: ProductImage) => image.type === "MAIN")?.imageUrl as string) : useImage("/files/defaults/white.jpeg")} alt={product.name} className="w-[100px] h-[200px]" />
            <h3 className='text-xl mt-2'>
              { product.name }
            </h3>

            <span className='mt-2 text-secondary'>
              ${ product.price }
            </span>
          </div>
          </Link>
          
        ))
      }
    </div>
  )
}
