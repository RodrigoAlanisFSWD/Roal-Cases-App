import { NextPage } from 'next'
import React from 'react'
import { Protected } from '../../../components/layouts/Protected'
import { CreateAddress } from '../../../components/pages/shopping/addresses/CreateAddress'

const CreateAddressPage: NextPage = () => {
  return (
    <Protected>
        <CreateAddress />
    </Protected>
  )
}

export default CreateAddressPage
