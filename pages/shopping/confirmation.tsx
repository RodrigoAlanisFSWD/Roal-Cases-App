import { NextPage } from 'next'
import React from 'react'
import { Protected } from '../../components/layouts/Protected'
import { BuyConfirmation } from '../../components/pages/shopping/BuyConfirmation'

const BuyConfirmationPage: NextPage = () => {

  return (
    <Protected>
      <BuyConfirmation />
    </Protected>
  )
}

export default BuyConfirmationPage