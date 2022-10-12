import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useEffect, useState } from 'react'
import { Brand, Model } from '../../../models/models'
import { Product, ProductImage } from '../../../models/product'
import { SelectItemType } from '../../../models/select'
import api from '../../../plugins/axios'
import { Button } from '../../atoms/shared/Button'
import { Main } from '../../layouts/Main'
import { Select } from '../../molecules/shared/Select'

interface ProductDetailProps {
    product: Product
}

export const ProductDetail: FC<ProductDetailProps> = ({ product }) => {

    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null)

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const image = product.images.find((i: any) => i.type === "MAIN");

        if (image) {
            setSelectedImage(image)
        }
    }, [])

    const [brand, setBrand] = useState<SelectItemType | null>(null)
    const [brands, setBrands] = useState<SelectItemType[]>([]) 
    const [model, setModel] = useState<SelectItemType | null>(null)
    const [models, setModels] = useState<SelectItemType[]>([]) 

    useEffect(() => {
        const init = async () => {
            const { data } = await api.post<Brand[]>("/models/brands/search", [product.category?.id.toString()])

            setBrands(data.reduce((acc: any, cur: any) => acc = [...acc, { key: cur.id, text: cur.name }], []))
        }

        init()
    }, [])

  return (
    <Main>
        <div className='w-2/5 max-h-full h-[100%] row-[2/3] flex justify-between pt-10'>
            <div>
                <img className='w-[250px] bg-cover' src={selectedImage?.imageUrl} alt={product.name} />
                <div className={`flex ${product.images.length > 2 ? "overflow-x-scroll" : ""} mt-2`}>
                    {
                        product.images.map((image: ProductImage) => (
                            <div key={image.id} className='w-[100px] mr-2 flex justify-center border border-gray-200'>
                                <img className='w-[50px] opacity-75' src={image.imageUrl} alt={product.name} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <h2 className='text-3xl mt-5 font-bold'>
                    { product.name }
                </h2>

                <h4 className='mt-5 text-2xl'>
                    ${ product.price }
                </h4>

                <div className='w-[250px] mt-5'>
                    <Select width='250px' selectedItem={brand} onSelect={(item) => setBrand(item)} placeholder='Marca' items={brands}  />
                    <Select width='250px' className='mt-5' selectedItem={model} onSelect={(item) => setModel(item)} placeholder='Modelo' items={models}  />
                </div>

                <div className='flex mt-5 items-center'>
                    <span className='text-2xl'>
                        Cantidad:
                    </span>

                    <FontAwesomeIcon className='ml-5 mr-2 select-none' icon={faChevronLeft} onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} />

                    <span className='text-xl'>
                        { quantity }
                    </span>

                    <FontAwesomeIcon className='ml-2 select-none' icon={faChevronRight} onClick={() => setQuantity(quantity + 1)} />
                </div>

                <Button text='Añadir Al Carrito' className="w-[250px] mt-5" />
            </div>

        </div>
    </Main>
  )
}
