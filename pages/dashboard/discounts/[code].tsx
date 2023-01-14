import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { DiscountForm } from '../../../components/pages/dashboard/discounts/DiscountForm'
import { getDiscountFromCode } from '../../../services/discountService'

const EditDiscountPage: NextPage<any> = ({ discount }) => {
  return (
    <Dashboard>
        <DiscountForm edit={true} discount={discount} />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
    const discount = await getDiscountFromCode(context.query.code as string)

    return {
        props: {
            discount,
        }
    }
        
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/dashboard/discounts"
            }
        }
    }
    
}

export default EditDiscountPage
