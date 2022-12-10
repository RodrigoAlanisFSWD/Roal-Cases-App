import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Main } from '../../../components/layouts/Main'
import { Protected } from '../../../components/layouts/Protected'
import { AddressForm } from '../../../components/organisms/shopping/addresses/AddressForm'
import api from '../../../interceptors/axios'
import { Address } from '../../../models/address'
import { getAddress } from '../../../services/addressesService'

interface EditAddressProps {
    address: Address
}

const EditAddress: NextPage<EditAddressProps> = ({ address }) => {
  return (
    <Protected>
        <Main>
            <AddressForm edit={true} address={address} />
        </Main>
    </Protected>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const cookies = context.req.cookies;

    const address = await api.get<Address>("/addresses/" + context.query.id, {
        headers: {
            Authorization: `Bearer ${cookies["roal_cases/access_token"]}`
        }
    })

    return {
        props: {
            address: address.data,
        }
    }
}

export default EditAddress
