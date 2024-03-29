import { NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { Protected } from '../../../components/layouts/Protected'
import { ModelForm } from '../../../components/pages/dashboard/models/ModelForm'

const CreateModelPage: NextPage = () => {
  return (
    <Dashboard>
      <ModelForm />
    </Dashboard>
  )
}

export default CreateModelPage
