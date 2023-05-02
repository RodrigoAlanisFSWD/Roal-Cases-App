import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { Protected } from '../../../components/layouts/Protected'
import { Discounts } from '../../../components/pages/dashboard/discounts/Discounts'
import { getDiscounts } from '../../../services/discountService'

const DiscountsPage: NextPage<any> = ({ discounts }) => {
  return (
    <Dashboard>
      <Discounts discounts={discounts} />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const discounts = await getDiscounts();

  return {
    props: {
      discounts,
    }
  }
}

export default DiscountsPage