import React, { useEffect, useState } from 'react'
import { GroupsList } from '../../../../organisms/dashboard/products/groups/GroupsList'
import styles from '../../../../../styles/pages/dashboard/products/groups/Groups.module.scss'
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
        <div className={styles['groups']}>
            <h2>
                Grupos De Productos
            </h2>
            
            <GroupsList />

            <Button onClick={() => router.push("/dashboard/products/groups/create")} text="Crear Grupo" className={styles['groups__btn']} />
        </div>
    )
}
