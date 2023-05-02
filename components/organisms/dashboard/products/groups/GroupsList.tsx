import React from 'react'
import { useSelector } from 'react-redux'
import { useAddCategoryModal } from '../../../../../hooks/addCategoryModal'
import { Group as GroupType, SubCategory } from '../../../../../models/category'
import { AppStore } from '../../../../../redux/store'
import { DashboardModal } from '../../../../layouts/DashboardModal'
import { Group } from '../../../../molecules/dashboard/products/groups/Group'
import { AddCategoryModal } from './AddCategoryModal'

export const GroupsList = () => {

  const groups = useSelector((store: AppStore) => store.groups)

  const { modalAction, modalPayload, showModal, handleModalAction, setShowModal } = useAddCategoryModal()

  return (
    <>
      <div>
        {
          groups.map((group: GroupType) => <Group onAction={handleModalAction} key={group.id} {...group} />)
        }
      </div>

      <DashboardModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={modalAction?.title ? modalAction?.title : ''}
      >
        <AddCategoryModal subCategory={modalPayload} buttonText={modalAction?.buttonText} onAdd={(subCategory: SubCategory) => {
          modalAction.toDo && modalAction.toDo(subCategory)
          setShowModal(false)
        }} />
      </DashboardModal>
    </>

  )
}
