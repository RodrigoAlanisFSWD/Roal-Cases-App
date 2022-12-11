import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import api from '../../../interceptors/axios'
import { Button } from '../../atoms/shared/Button'

export const AfterPayment: FC<any> = ({ session }) => {

    const router = useRouter()

    useEffect(() => {
        const init = async () => {
            console.log(router.query);
            try {
                await api.post("http://localhost:8080/api/payments/finish/" + session)
            } catch (error) {
                console.log(error)
                router.push("/")
            }            
        }

        init()
    }, [])

  return (
    <div className='w-2/5 h-auto shadow-lg rounded-sm p-5 flex flex-col justify-between items-center'>
                    <div className='w-[150px] h-[150px] rounded-full bg-primary flex justify-center items-center mb-5'>
                        <FontAwesomeIcon icon={faCheck} className="text-white text-5xl" />

                    </div>
                    <h2 className='text-2xl'>
                        Gracias Por Tu Compra!
                    </h2>
                    <div className='text-xl my-8 text-center'>
                        En Breves Te Llegara Un Email A Tu Correo Electronico Para Confirmar La Compra. Gracias Por Confiar En Nosotros!
                    </div>
                    <Button text="Continuar" onClick={() => router.push("/")} />
                </div>
  )
}
