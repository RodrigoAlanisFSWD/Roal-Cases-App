import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Group as GroupType, SubCategory } from '../../../../../models/category'
import { useGroupService } from '../../../../../services/groupService'
import { StoreState } from '../../../../../store'
import { Group } from '../../../../molecules/dashboard/products/products/Group'
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

  const groups = useSelector((store: StoreState) => store.groups)

  const { createSubCategories, updateSubCategory } = useGroupService();

  const handleModalAction = (action: string, groupId: number, subCategory: SubCategory | null = null) => {
    switch(action) {
      case 'EDIT':
        setShowModal(true)
        setModalPayload(subCategory)

        return setModalAction({
          title: "Editar Categoria",
          buttonText: "Editar",
          toDo: async (data: SubCategory) => {
            await updateSubCategory({...subCategory, ...data}, groupId)
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
            await createSubCategories([subCategory], groupId)
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
