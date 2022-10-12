import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { Group, SubCategory } from '../../../models/category'
import { SubCategoryFilterItem } from '../../atoms/products/SubCategoryFilterItem'

interface SubCategoryFilterGroupProps extends Group {
    filters: string[]
}

export const SubCategoryFilterGroup: FC<SubCategoryFilterGroupProps> = ({ name, subCategories, filters }) => {

    const [show, setShow] = useState(false)

  return (
    <>
    <div className='flex justify-between items-center h-10'>
        <h4 className='text-lg'>
            { name }
        </h4>
        <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} onClick={() => setShow(!show)} />
    </div>

    <AnimatePresence>
        {
            show && (
                <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}>
                    {
                        subCategories?.map((subCategory: SubCategory) => <SubCategoryFilterItem subCategories={filters} key={subCategory.id} {...subCategory} />)
                    }
                </motion.div>
            )
        }
    </AnimatePresence>
    </>
    
  )
}
