import { useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as types from "../../../redux/types/payment"
import { setStatus } from '../../../redux/states/payment'
import { useSelector } from 'react-redux'
import { AppStore } from '../../../redux/store'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import { PaymentUI } from '../../organisms/shopping/PaymentUI'

export const Payment = () => {

    const stripe = useStripe()
    const elements = useElements();

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const key = useSelector((store: AppStore) => store.payment.clientSecret)

    const router = useRouter();

    const cookies = new Cookies();


    const submit = async () => {
        if (!stripe || !elements || !key) {
            return;
        }

        cookies.set("roal_cases/payment-intent", key, {
            domain: process.env.NEXT_PUBLIC_CLIENT_DOMAIN,
            path: "/",
        });

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: process.env.NEXT_PUBLIC_CLIENT_URL + "/shopping/after-payment",
            },
            redirect: "if_required",
        });

        if (error && error.message) {
            setErrorMessage(error.message);
            return;
        }

        dispatch(setStatus(types.SUCCESS))

        router.push("/shopping/after-payment?payment_intent_client_secret=" + key)
    }

    

    return (
        <PaymentUI submit={submit} errorMessage={errorMessage} />
    )
}
