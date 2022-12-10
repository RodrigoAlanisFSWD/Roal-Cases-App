import React, { FC, useEffect, useState } from 'react'
import { Product, ProductImage } from '../../../models/product'
import { SelectItemType } from '../../../models/select'
import { Button } from '../../atoms/shared/Button'
import { Main } from '../../layouts/Main'
import { Select } from '../../molecules/shared/Select'
import { searchBrands, searchModels } from '../../../services/modelsService'
import { Alert } from '../../atoms/shared/Alert'
import { addProductToCart } from '../../../services/cartService'
import { Counter } from '../../atoms/shared/Counter'
import { useDispatch } from 'react-redux'
import { setCart } from '../../../redux/states/cart'

interface ProductDetailProps {
    product: Product
}

export const ProductDetail: FC<ProductDetailProps> = ({ product }) => {

    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null)

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

    const [error, setError] = useState(false)

    useEffect(() => {
        const init = async () => {
            const findedBrands = await searchBrands([product.category?.id.toString()])

            setBrands(findedBrands.reduce((acc: any, cur: any) => acc = [...acc, { key: cur.id, text: cur.name }], []))

            const findedModels = await searchModels([product.category?.id.toString()])

            setModels(findedModels.reduce((acc: any, cur: any) => acc = [...acc, { key: cur.id, text: cur.name }], []))
        }

        init()
    }, [])

    const dispatch = useDispatch();

    const submit = async () => {
        if (!brand || !model) {
            setError(true)
            return
        }

        setError(false)

        const newProduct = {
            model: {
                id: model.key,
                name: model.text
            },
            count,
            product: product,
        }

        const cart = await addProductToCart(newProduct)

        dispatch(setCart(cart))
    }

    const [count, setCount] = useState(1)

    return (
        <Main>
                <div className='w-full sm:w-[calc(100%-50px)] md:w-4/5 lg:w-3/5 xl:w-2/5 max-h-full h-[100%] flex flex-col sm:flex-row justify-start items-center sm:items-start sm:justify-between sm:pb-0 pb-10'>
                    <div>
                        <img className='w-[250px] bg-cover' src={selectedImage?.imageUrl} alt={product.name} />
                        <div className={`flex ${product.images.length > 2 ? "overflow-x-scroll" : ""} mt-2 h-[100px]`}>
                            {
                                product.images.map((image: ProductImage) => (
                                    <div onClick={() => setSelectedImage(image)} key={image.id} className='w-[100px] mr-2 flex justify-center border border-gray-200'>
                                        <img className='w-[50px] opacity-75' src={image.imageUrl} alt={product.name} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex flex-col items-center sm:items-start w-full sm:w-auto px-5'>
                        <h2 className='text-3xl mt-5'>
                            {product.name}
                        </h2>

                        <h4 className='mt-5 text-2xl'>
                            ${product.price}
                        </h4>

                        <div className='w-full sm:w-[250px] mt-5'>
                            <Select width="w-[calc(100%-40px)] sm:w-[250px]" className="w-full sm:w-[250px]" selectedItem={brand} onSelect={(item) => setBrand(item)} placeholder='Marca' items={brands} />
                            <Select width="w-[calc(100%-40px)] sm:w-[250px]" className='mt-5 w-full sm:w-[250px]' selectedItem={model} onSelect={(item) => setModel(item)} placeholder='Modelo' items={models} />
                        </div>

                        <div className='flex mt-5 items-center'>
                            <Counter count={count} setCount={setCount} />
                        </div>

                        <Button text='Añadir Al Carrito' className="sm:w-[250px] mt-5" onClick={() => submit()} />

                        {
                            error && <Alert text="Elige Un Modelo" className='mt-2' />
                        }

                    </div>

                </div>
        </Main>
    )
}
