import { NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../../components/layouts/Dashboard'
import { Brands } from '../../../../components/pages/dashboard/models/brands/Brands'

const BrandsPage: NextPage = () => {
  return (
    <Dashboard>
        <Brands />
    </Dashboard>
  )
}

export default BrandsPage
