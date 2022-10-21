import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../../components/layouts/Dashboard'
import { BrandForm } from '../../../../components/pages/dashboard/models/brands/BrandForm'
import { Brand } from '../../../../models/models'
import { getBrand } from '../../../../services/modelsService'

interface EditBrandProps {
    brand: Brand
}

const EditBrandPage: NextPage<EditBrandProps> = ({ brand }) => {
  return (
    <Dashboard>
        <BrandForm edit={true} brand={brand} />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const brand = await getBrand(context.query.id)

    return {
        props: {
            brand,
        }
    }
}

export default EditBrandPage