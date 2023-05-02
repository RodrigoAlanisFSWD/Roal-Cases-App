import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../../components/layouts/Dashboard'
import { Protected } from '../../../../components/layouts/Protected'
import { Brands } from '../../../../components/pages/dashboard/models/brands/Brands'
import { Brand } from '../../../../models/models'
import { getBrands } from '../../../../services/modelsService'

interface BrandsProps {
  brands: Brand[]
}

const BrandsPage: NextPage<BrandsProps> = ({ brands }) => {
  return (
    <Dashboard>
      <Brands brands={brands} />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const brands = await getBrands();

  return {
    props: {
      brands,
    }
  }
}

export default BrandsPage
