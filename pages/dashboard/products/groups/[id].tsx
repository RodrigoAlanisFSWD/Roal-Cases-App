import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Dashboard } from '../../../../components/layouts/Dashboard';
import { GroupForm } from '../../../../components/pages/dashboard/products/groups/GroupForm';
import { Group } from '../../../../models/category';
import { useGroupService } from '../../../../services/groupService';

const EditGroupPage = () => {

    const router = useRouter();

    const { id } = router.query

    const { getGroup } = useGroupService()

    const [group, setGroup] = useState<Group | null>(null)

    useEffect(() => {
        const init = async () => {
            setGroup(await getGroup(id))
        }

        if (id) {
            init()
        }

    }, [id])

  return group && (
    <Dashboard>
        <GroupForm edit={true} group={group} />
    </Dashboard>
  )
}

export default EditGroupPage;