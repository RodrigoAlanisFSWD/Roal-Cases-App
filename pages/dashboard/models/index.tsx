import { NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { Protected } from '../../../components/layouts/Protected'
import { Models } from '../../../components/pages/dashboard/models/Models'

const ModelsPage: NextPage = () => {
  return (
    <Dashboard>
      <Models />
    </Dashboard>
  )
}

export default ModelsPage
