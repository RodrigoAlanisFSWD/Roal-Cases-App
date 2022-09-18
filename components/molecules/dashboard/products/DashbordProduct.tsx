import { faAngleDown, faAngleUp, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { SubCategory } from '../../../../models/category'
import { Product } from '../../../../models/product'
import { useProductService } from '../../../../services/productService'
import styles from '../../../../styles/molecules/dashboard/products/DashboardProduct.module.scss'
import { IconButton } from '../../../atoms/shared/IconButton'

export const DashbordProduct: FC<Product> = ({ name, category, subCategories, description, id, imageUrl }) => {

    const [showInfo, setShowInfo] = useState(false);

    const router = useRouter()

    const { deleteProduct } = useProductService()

  return (
    <>
      <div className={styles['product']}>
        <FontAwesomeIcon style={{ marginLeft: 15 }} onClick={() => setShowInfo(!showInfo)} icon={showInfo ? faAngleUp : faAngleDown} />
        <h4>
          {name}
        </h4>
        <div className={styles['product__actions']}>
          <IconButton onClick={() => {
            router.push("/dashboard/products/" + id)
          }} icon={faPencil} color="primary" />
          <IconButton onClick={async () => {
            await deleteProduct(id)
          }} icon={faTrash} color="danger" />
        </div>
      </div>
      <AnimatePresence>
        {
          showInfo && (
            <motion.div className={styles['productInfo']}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>
                Categoria: { category?.name }
              </h3>

              <h3>
                Sub Categorias:
              </h3>

              <ul>
                {
                    subCategories?.map((subCategory: SubCategory) => <li key={subCategory.id}>{ subCategory.name }</li>)
                }
              </ul>

            </motion.div>
          )
        }
      </AnimatePresence>
    </>
  )
}
