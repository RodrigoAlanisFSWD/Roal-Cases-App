import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { Address as AddressType } from '../../../models/address'
import { getAddresses } from '../../../services/addressesService'
import { Address } from '../../molecules/shopping/Address'

interface AddressesProps {
    selected: AddressType | null;
    onChange: (address: AddressType) => void;
}

export const Addresses: FC<AddressesProps> = ({ selected, onChange }) => {

    const [addresses, setAddresses] = useState<AddressType[]>([])

    const init = async () => {
        setAddresses(await getAddresses())
    }

    useEffect(() => {
        init()
    }, [])

  return (
    <div className='w-full min-h-[250px] p-5 flex flex-col justify-between'>
        <h2 className='text-xl'>
            Dirreciones De Envio
        </h2>
        <div className='min-h-[100px] mb-3 w-full flex sm:justify-start justify-center flex-wrap gap-5 py-5'>
            {
                addresses.map((address: AddressType) => <Address selected={selected} onChange={onChange} key={address.id} {...address} /> )
            }
        </div>
        <Link href={"/shopping/addresses/create"}>
            <h3 className='text-primary text-lg'>
                <FontAwesomeIcon icon={faAdd} className="mr-2" />
                Agregar Nueva Direccion
            </h3>
        </Link>
    </div>
  )
}
