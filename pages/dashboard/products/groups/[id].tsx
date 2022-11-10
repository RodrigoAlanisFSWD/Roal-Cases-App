import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Dashboard } from '../../../../components/layouts/Dashboard';
import { GroupForm } from '../../../../components/pages/dashboard/products/groups/GroupForm';
import { Group } from '../../../../models/category';
import { getGroup } from '../../../../services/groupsService';

interface EditProps {
  group: Group
}

const EditGroupPage: NextPage<EditProps> = ({ group }) => {

  return (
    <Dashboard>
        <GroupForm edit={true} group={group} />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const group = await getGroup(context.query.id as string)

    return {
        props: {
          group
        }
    }
}

export default EditGroupPage;