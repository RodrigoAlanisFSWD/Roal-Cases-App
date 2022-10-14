import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Group as GroupType, SubCategory } from '../../../../../models/category'
import { addSubCategoriesToGroup, editSubCategoryFromGroup } from '../../../../../redux/states/groups'
import { AppStore } from '../../../../../redux/store'
import { createSubCategories, editSubCategory } from '../../../../../services/subCategoriesService'
import { Group } from '../../../../molecules/dashboard/products/groups/Group'
import { AddCategoryModal } from './AddCategoryModal'

interface ModalAction {
  title?: string;
  buttonText?: string;
  toDo?: (subCategory: SubCategory) => void;
  payload?: SubCategory
}

export const GroupsList = () => {

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<ModalAction>({})
  const [modalPayload, setModalPayload] = useState<SubCategory | null>(null)

  const groups = useSelector((store: AppStore) => store.groups)

  const dispatch = useDispatch()

  const handleModalAction = (action: string, groupId: number, subCategory: SubCategory | null = null) => {
    switch(action) {
      case 'EDIT':
        setShowModal(true)
        setModalPayload(subCategory)

        return setModalAction({
          title: "Editar Categoria",
          buttonText: "Editar",
          toDo: async (data: SubCategory) => {
            const updated = await editSubCategory({...subCategory, ...data})
            dispatch(editSubCategoryFromGroup({
              subCategory: updated,
              groupId: groupId
            }))
            setShowModal(false)
            setModalPayload(null)
          }
        })
      case 'CREATE':
        setShowModal(true)
        setModalPayload(null)

        return setModalAction({
          title: "Crear Categoria",
          buttonText: "Crear",
          toDo: async (subCategory: SubCategory) => {
            const created = await createSubCategories([subCategory], groupId)

            dispatch(addSubCategoriesToGroup({
              subCategories: created,
              groupId,
            }))
            setShowModal(false)
          }
        })
    }
  }

  return (
    <>
     <div>
      {
        groups.map((group: GroupType) => <Group onAction={handleModalAction} key={group.id} {...group} />)
      }
    </div>

    {
      showModal && <AddCategoryModal subCategory={modalPayload} onClose={() => setShowModal(false)} title={modalAction?.title} buttonText={modalAction?.buttonText} onAdd={(subCategory: SubCategory) => modalAction.toDo && modalAction.toDo(subCategory)} />
    }
    </>
   
  )
}
