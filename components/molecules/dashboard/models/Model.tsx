import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Model as ModelType } from '../../../../models/models'
import { Button } from '../../../atoms/shared/Button'
import { IconButton } from '../../../atoms/shared/IconButton'

interface ModelProps extends ModelType {
  onDelete: (id: number) => void
}

export const Model: FC<ModelProps> = ({ name, id, onDelete }) => {

    const router = useRouter();

  return (
    <div className='border-b border-gray-200 h-[60px] flex items-center justify-between'>
        <h4 className='text-2xl ml-5'>
            { name }
        </h4>
        <div className="flex justify-end">
          <IconButton onClick={() => {
            router.push("/dashboard/models/" + id)
          }} icon={faPencil} color="primary" className="ml-[10px]" />
          <IconButton onClick={() => onDelete(id)} icon={faTrash} color="danger" className="ml-[10px]" />
        </div>
    </div>
  )
}
