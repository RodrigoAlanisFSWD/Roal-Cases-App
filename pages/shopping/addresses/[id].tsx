import { Order } from '@stripe/stripe-js'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Main } from '../../../components/layouts/Main'
import { Protected } from '../../../components/layouts/Protected'
import { AddressForm } from '../../../components/organisms/shopping/addresses/AddressForm'
import api from '../../../interceptors/axios'
import { Address } from '../../../models/address'
import { getAddress } from '../../../services/addressesService'
import { getOrder } from '../../../services/ordersService'

const EditAddress: NextPage<any> = ({ id }) => {

    const [address, setAddress] = useState<Address | null>(null)

    useEffect(() => {
        (async () => {
            setAddress(await getAddress(id))
        })()
    })

    return (
        <Protected>
            <Main>
                {
                    address ?  <AddressForm edit={true} address={address} /> : <></>
                }
            </Main>
        </Protected>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
      props: {
        id: context.query.id
      }
    }
  }

export default EditAddress
