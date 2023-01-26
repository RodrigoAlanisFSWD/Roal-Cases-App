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

const EditAddress: NextPage = () => {

    const [address, setAddress] = useState<Address | null>(null)

    const router = useRouter()

    useEffect(() => {
        (async () => {
            setAddress(await getAddress(router.query.id))
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

export default EditAddress
