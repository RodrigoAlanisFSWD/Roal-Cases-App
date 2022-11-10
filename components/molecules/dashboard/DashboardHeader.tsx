import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '../../../redux/store'

export const DashboardHeader = () => {

    const profile = useSelector((store: AppStore) => store.auth.profile)

    return (
        <div className="w-full bg-white border-b border-[#292929] grid grid-cols-[1fr_200px] h-[60px]">
            <div className="">

            </div>
            <div className="flex justify-end items-center">
                <FontAwesomeIcon icon={faBell} className="text-xl mr-6 text-dark sm:text-2xl" />
                <div className="w-[175px] hidden justify-center items-center border-l border-[#292929] px-6 h-full sm:flex">
                    <FontAwesomeIcon icon={faUserCircle} className="text-4xl text-dark mr-4" />
                    <div>
                        <h3>
                            {profile?.name}
                        </h3>
                        <h4 className="text-dark">
                            Administrador
                        </h4>
                    </div>

                </div>
            </div>
        </div>
    )
}
