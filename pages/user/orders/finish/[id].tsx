import { Order } from '@stripe/stripe-js'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Main } from '../../../../components/layouts/Main'
import { Protected } from '../../../../components/layouts/Protected'
import { FinishOrder } from '../../../../components/pages/user/FinishOrder'
import api from '../../../../interceptors/axios'

const FinishOrderPage: NextPage<any> = ({ order }) => {
  return (
    <Protected>
      <Main>
        <FinishOrder order={order} />
      </Main>
    </Protected>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const cookies = context.req.cookies;

  const order = await api.get<Order>("/orders/" + context.query.id, {
      headers: {
          Authorization: `Bearer ${cookies["roal_cases/access_token"]}`
      }
  })

  return {
      props: {
          order: order.data
      }
  }
}

export default FinishOrderPage
