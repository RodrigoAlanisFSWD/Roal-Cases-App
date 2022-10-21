import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Product, ProductImage as ProductImageType } from '../../../../models/product'
import { deleteProductImage, getProduct, updateProductImage, uploadProductImage } from '../../../../services/productsService'
import { ProductImage } from '../../../atoms/dashboard/ProductImage'

export const ProductImages = () => {

    const fileInput = React.useRef<HTMLInputElement>(null);

    const [product, setProduct] = useState<Product | null>(null)

    const router = useRouter()

    const { id } = router.query

    useEffect(() => {
        const init = async () => {
            if (id) {
                setProduct(await getProduct(id as any))
            }
        }

        init()
    }, [id])

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const handleChange = async (event: any) => {
        const fileUploaded = event.target.files[0];

        if (product) {
            const formData = new FormData()

            formData.set("image", fileUploaded)
            const newProduct = await uploadProductImage(formData, product.id, product?.images.length > 0 ? "NORMAL" : "MAIN")
            setProduct(newProduct)
            event.target.value = null;
        }

    };

    return product && (
        <div className={`w-full max-h-[100%] h-full sm:h-auto overflow-y-scroll border border-gray-200 flex flex-wrap ${product.images.length > 2 ? 'justify-center sm:justify-evenly' : "justify-center sm:justify-start"} rounded-sm`}>
            {
                product.images.sort((a: any, b: any) => a.type === "MAIN" ? -1 : 0).map((image: ProductImageType) => (
                    <ProductImage key={image.id} {...image} handleDelete={async (id) => {
                        await deleteProductImage(id)
                        setProduct({ ...product, images: product.images.filter((i: ProductImageType) => i.id !== id) })
                    }} handleEdit={async (file, id) => {
                        const formData = new FormData()

                        formData.set("image", file)

                        const edited = await updateProductImage(formData, id)
                        setProduct({ ...product, images: product.images.map((i: ProductImageType) => i.id !== id ? i : edited) })
                    }} />
                ))
            }
            <div onClick={() => {
                handleClick()
            }} className='w-[200px] h-[235px] border border-background rounded-sm flex justify-center items-center bg-background m-5'>
                <input type="file" ref={fileInput}
                    onChange={handleChange}
                    style={{ display: 'none' }} />
                <FontAwesomeIcon icon={faAdd} className="text-2xl text-secondary" />
            </div>
        </div>
    )
}
