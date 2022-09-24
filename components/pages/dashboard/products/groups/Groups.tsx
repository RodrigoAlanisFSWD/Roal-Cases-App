import React, { useEffect, useState } from 'react'
import { GroupsList } from '../../../../organisms/dashboard/products/groups/GroupsList'
import { useRouter } from 'next/router'
import { Button } from '../../../../atoms/shared/Button'
import { useGroupService } from '../../../../../services/groupService'

export const Groups = () => {

    const { getGroups } = useGroupService();

    useEffect(() => {
        const init = async () => {
            await getGroups()
        }

        init()
    }, [])

    const router = useRouter();

    return (
        <div>
            <h2 className="text-center sm:text-left text-2xl mb-6 sm:text-3xl">
                Grupos De Productos
            </h2>
            
            <GroupsList />

            <Button onClick={() => router.push("/dashboard/products/groups/create")} text="Crear Grupo" className="mt-7 sm:w-[250px]" />
        </div>
    )
}
