import { faAdd, faAngleDown, faAngleUp, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { Group as GroupType, SubCategory } from '../../../../../models/category'
import { useGroupService } from '../../../../../services/groupService'
import { IconButton } from '../../../../atoms/shared/IconButton'

interface GroupProps extends GroupType {
  onAction: (action: string, groupId: number, subCategory: SubCategory | null) => void;
}

export const Group: FC<GroupProps> = ({ name, id, subCategories, onAction }) => {

  const router = useRouter()

  const { deleteGroup, deleteSubCategory } = useGroupService()

  const [showCategories, setShowCategories] = useState(false);

  return (
    <>
      <div className="border-b border-gray-200 grid h-[120px] grid-cols-1 grid-rows-2 justify-items-center items-center sm:grid-cols-2 sm:h-[60px] sm:items-center sm:justify-items-stretch sm:grid-rows-1">
        <div className='flex items-center'>
        <FontAwesomeIcon style={{ marginLeft: 15 }} onClick={() => setShowCategories(!showCategories)} icon={showCategories ? faAngleUp : faAngleDown} />
        <h4 className='ml-4 text-2xl'>
          {name}
        </h4>
        </div>
        
        <div className="flex justify-evenly h-full w-3/4 sm:justify-end sm:w-auto self-end items-center">
        <IconButton onClick={() => {
            onAction('CREATE', id, null)
          }} icon={faAdd} color="primary" className='ml-[10px]' />
          <IconButton onClick={() => {
            router.push("/dashboard/products/groups/" + id)
          }} icon={faPencil} color="primary" className='ml-[10px]' />
          <IconButton onClick={async () => {
            await deleteGroup(id)
          }} icon={faTrash} color="danger" className='ml-[10px]' />
        </div>
      </div>
      <AnimatePresence>
        {
          showCategories && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl my-4">
                Categorias:
              </h3>

              <div>
                {
                  subCategories?.map((subCategory: SubCategory) => (
                    <article key={subCategory.name} className="grid grid-cols-[1fr_100px] h-[50px] items-center sm:h-[60px] sm:grid-cols-[1fr_200px] border-b border-gray-200">
                      <h4 className="ml-4 text-xl sm:text-2xl">
                        {subCategory.name}
                      </h4>
                      <div className="flex justify-end">
                        <IconButton onClick={() => {
                          onAction('EDIT', id, subCategory)
                        }} icon={faPencil} color="primary" className='ml-[10px]' />
                        <IconButton onClick={async () => {
                          await deleteSubCategory(subCategory, id)
                        }} icon={faTrash} color="danger" className='ml-[10px]' />
                      </div>
                    </article>
                  ))
                }
              </div>

            </motion.div>
          )
        }
      </AnimatePresence>
    </>

  )
}
