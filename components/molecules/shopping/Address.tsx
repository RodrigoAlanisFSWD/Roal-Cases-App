import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useState } from 'react'
import { Address as AddressType } from '../../../models/address'
import { CheckBox } from '../../atoms/shared/CheckBox'

interface AddressProps extends AddressType {
    selected: AddressType | null;
    onChange: (address: any) => void;
}

export const Address: FC<AddressProps> = (props) => {

    const { id, name, street, state, postalCode, selected, onChange } = props

  return (
    <div className={`w-[450px] flex justify-between border border-gray-200 p-4 transition-all duration-300 ${selected?.id === id ? "bg-background" : ""}`}>
        <CheckBox isActive={selected?.id === id} onChange={() => onChange({
            id: id
        })} />
        <div>
            <div className='flex'>
                <h3 className='mr-5 text-xl text-secondary'>
                    Nombre:
                </h3>
                <h3 className='text-xl'>
                    { name } 
                </h3>
            </div>
            <div className='flex'>
                <h3 className='mr-5 text-xl text-secondary'>
                    Direccion:
                </h3>
                <h3 className='text-xl'>
                    { street } 
                </h3>
            </div>
            <div className='flex'>
                <h3 className='mr-5 text-xl text-secondary'>
                    Codigo Postal:
                </h3>
                <h3 className='text-xl'>
                    { postalCode } 
                </h3>
            </div>
        </div>
        <FontAwesomeIcon icon={faEllipsis} className="rotate-90" />
    </div>
  )
}
