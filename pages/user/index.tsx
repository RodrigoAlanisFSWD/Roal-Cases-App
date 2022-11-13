import { NextPage } from 'next'
import React from 'react'
import { Protected } from '../../components/layouts/Protected'
import { UserInfo } from '../../components/pages/user/UserInfo'

const UserPage: NextPage = () => {
  return (
    <Protected>
        <UserInfo />
    </Protected>
  )
}

export default UserPage