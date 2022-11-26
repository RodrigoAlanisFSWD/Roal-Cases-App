import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Alert } from '../../atoms/shared/Alert'
import { Button } from '../../atoms/shared/Button'
import * as types from "../../../redux/types/payment"
import { setStatus } from '../../../redux/states/payment'
import { useSelector } from 'react-redux'
import { AppStore } from '../../../redux/store'
import { useRouter } from 'next/router'

export const Payment = () => {

    const stripe = useStripe()
    const elements = useElements();

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const key = useSelector((store: AppStore) => store.payment.clientSecret)

    const router = useRouter();

    const submit = async () => {
        if (!stripe || !elements) {
            return;
        }

        dispatch(setStatus(types.IN_CONFIRMATION))

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/shopping/after-payment"
            },
            redirect: "if_required"
        })

        if (error && error.message) { 
            setErrorMessage(error.message) 
            return
        }

        router.push("/shopping/after-payment?payment_intent_client_secret=" + key)
    }

  return (
    <div className='w-full p-5 flex flex-col'>
        <PaymentElement className='w-full' />
                <Button text="Finalizar Compra" className="mt-12" onClick={() => submit()} />
                {
                    errorMessage && <Alert text="La Targeta Utilizada No Completo El Pago. Intenta Con Otra" className='mt-5' />
                }
    </div>
  )
}
