import { faAngleDown, faAngleUp, faImage, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { SubCategory } from '../../../../models/category'
import { Product } from '../../../../models/product'
import { useProductService } from '../../../../services/productService'
import { IconButton } from '../../../atoms/shared/IconButton'

export const DashbordProduct: FC<Product> = ({ name, category, subCategories, description, id, imageUrl, slug }) => {

    const [showInfo, setShowInfo] = useState(false);

    const router = useRouter()

    const { deleteProduct } = useProductService()

  return (
    <>
      <div className="border-b border-gray-200 grid grid-cols-[40px_1fr_100px] h-[60px] items-center sm:grid-cols-[40px_1fr_200px]">
        <FontAwesomeIcon style={{ marginLeft: 15 }} onClick={() => setShowInfo(!showInfo)} icon={showInfo ? faAngleUp : faAngleDown} />
        <h4 className="text-2xl ml-4">
          {name}
        </h4>
        <div className="flex justify-end">
        <IconButton onClick={() => {
            router.push("/dashboard/products/images/" + slug)
          }} icon={faImage} color="primary" className="ml-[10px]" />
          <IconButton onClick={() => {
            router.push("/dashboard/products/" + slug)
          }} icon={faPencil} color="primary" className="ml-[10px]" />
          <IconButton onClick={async () => {
            await deleteProduct(id)
          }} icon={faTrash} color="danger" className="ml-[10px]" />
        </div>
      </div>
      <AnimatePresence>
        {
          showInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl my-[15px]">
                Categoria: { category?.name }
              </h3>

              <h3 className="text-2xl my-[15px]">
                Sub Categorias:
              </h3>

              <ul className="px-6">
                {
                    subCategories?.map((subCategory: SubCategory) => <li className='text-xl list-disc' key={subCategory.id}>{ subCategory.name }</li>)
                }
              </ul>

            </motion.div>
          )
        }
      </AnimatePresence>
    </>
  )
}
