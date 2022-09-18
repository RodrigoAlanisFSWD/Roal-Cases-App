import { faAdd, faAngleDown, faAngleUp, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Group as GroupType, SubCategory } from '../../../../../models/category'
import { useGroupService } from '../../../../../services/groupService'
import { StoreState } from '../../../../../store'
import styles from '../../../../../styles/molecules/dashboard/products/groups/Group.module.scss'
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
      <div className={styles['group']}>
        <FontAwesomeIcon style={{ marginLeft: 15 }} onClick={() => setShowCategories(!showCategories)} icon={showCategories ? faAngleUp : faAngleDown} />
        <h4>
          {name}
        </h4>
        <div className={styles['group__actions']}>
        <IconButton onClick={() => {
            onAction('CREATE', id, null)
          }} icon={faAdd} color="primary" />
          <IconButton onClick={() => {
            router.push("/dashboard/products/groups/" + id)
          }} icon={faPencil} color="primary" />
          <IconButton onClick={async () => {
            await deleteGroup(id)
          }} icon={faTrash} color="danger" />
        </div>
      </div>
      <AnimatePresence>
        {
          showCategories && (
            <motion.div className={styles['subCategories']}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>
                Categorias:
              </h3>

              <div className={styles['subCategories__list']}>
                {
                  subCategories?.map((subCategory: SubCategory) => (
                    <article key={subCategory.name} className={`${styles['group']} ${styles['group--category']}`}>
                      <h4>
                        {subCategory.name}
                      </h4>
                      <div className={styles['group__actions']}>
                        <IconButton onClick={() => {
                          onAction('EDIT', id, subCategory)
                        }} icon={faPencil} color="primary" />
                        <IconButton onClick={async () => {
                          await deleteSubCategory(subCategory, id)
                        }} icon={faTrash} color="danger" />
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
