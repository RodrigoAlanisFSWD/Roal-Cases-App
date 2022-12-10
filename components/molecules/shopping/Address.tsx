import { faEllipsis, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { Address as AddressType } from '../../../models/address'
import { CheckBox } from '../../atoms/shared/CheckBox'

interface AddressProps extends AddressType {
    selected: AddressType | null;
    onChange: (address: any) => void;
    onDelete: (id: number) => void;
}

export const Address: FC<AddressProps> = (props) => {

    const { id, name, street, state, postalCode, selected, onChange, onDelete } = props

    const [showOptions, setShowOptions] = useState(false)

    const router = useRouter()

    return (
        <div className={`max-w-[450px] w-[450px] flex justify-between border border-gray-200 p-4 transition-all duration-300 ${selected?.id === id ? "bg-background" : ""}`}>
            <CheckBox isActive={selected?.id === id} onChange={() => onChange({
                id: id
            })} />
            <div className='max-w-[305px] ml-5 sm:ml-0'>
                <div className='flex max-h-[28px] overflow-hidden'>
                    <h3 className='mr-5 text-lg sm:text-xl text-secondary'>
                        Nombre:
                    </h3>
                    <h3 className='text-lg sm:text-xl'>
                        {name}
                    </h3>
                </div>
                <div className='flex max-h-[28px] overflow-hidden'>
                    <h3 className='mr-5 text-lg sm:text-xl text-secondary'>
                        Direccion:
                    </h3>
                    <h3 className='text-lg sm:text-xl'>
                        {street}  asdasdasdasd
                    </h3>
                </div>
                <div className='flex max-h-[28px] overflow-hidden'>
                    <h3 className='mr-5 text-lg sm:text-xl text-secondary'>
                        Codigo Postal:
                    </h3>
                    <h3 className='text-lg sm:text-xl'>
                        {postalCode}
                    </h3>
                </div>
            </div>
            <div>
                <FontAwesomeIcon icon={faEllipsis} className="rotate-90 select-none" onClick={() => setShowOptions(!showOptions)} />
                {
                    showOptions && (
                        <div className='absolute w-[100px] h-auto bg-white border border-gray-200 rounded-sm ml-[-68px] mt-[2px]'>
                            {/* <div className='w-full flex items-center justify-between hover:bg-gray-100 p-2 px-3 transition-all duration-300 cursor-pointer'>
                                Eliminar <FontAwesomeIcon icon={faTrash} />
                            </div> */}
                            <div className='w-full flex items-center justify-between hover:bg-gray-100 p-2 px-3 transition-all duration-300 cursor-pointer' onClick={() => router.push("/shopping/addresses/" + id)}>
                                Editar <FontAwesomeIcon icon={faPencil} />
                            </div>
                        </div>
                    )
                }

            </div>

        </div>
    )
}
