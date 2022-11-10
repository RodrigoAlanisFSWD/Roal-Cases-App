import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Dashboard } from '../../../../components/layouts/Dashboard'
import { Groups } from '../../../../components/pages/dashboard/products/groups/Groups'
import { Group } from '../../../../models/category'
import { setGroups } from '../../../../redux/states/groups'
import { getGroups } from '../../../../services/groupsService'

interface GroupsProps {
  groups: Group[]
}

const GroupsPage: NextPage<GroupsProps> = ({ groups }) => {

  const dispatch = useDispatch()

  dispatch(setGroups(groups))

  return (
    <Dashboard>
        <Groups />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const groups = await getGroups()

  return {
    props: {
      groups
    }
  }
}

export default GroupsPage