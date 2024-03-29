import { NextPage } from 'next'
import React, { FC } from 'react'
import { Dashboard } from '../../../../components/layouts/Dashboard'
import { Protected } from '../../../../components/layouts/Protected'
import { BrandForm } from '../../../../components/pages/dashboard/models/brands/BrandForm'

const CreateBrandPage: NextPage = () => {
  return (
    <Dashboard>
      <BrandForm />
    </Dashboard>
  )
}

export default CreateBrandPage
