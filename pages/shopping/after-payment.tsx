import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect } from 'react'
import { Main } from '../../components/layouts/Main';
import { AfterPayment } from '../../components/pages/shopping/AfterPayment';

interface AfterPaymentProps {
    status: string;
    clientSecret: string;
    payment: string;
}

const stripePromise = loadStripe(`pk_test_51LyNkyKPetfkQCPTSc9jm3HSkMjM1C5hkUJawieii7dfvERSxm6GEWOudV9HbQzXiPkoPIMtzzxTMoH9e1beab3I00Z1sI3gRC`, {
    locale: "es"
})

const AfterPaymentPage: NextPage<AfterPaymentProps> = ({ status, clientSecret, payment }) => {

    return (
        <Elements stripe={stripePromise} options={{
            clientSecret,
        }}>
            <Main>
                <AfterPayment payment={payment} />
            </Main>
        </Elements>

    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const cookies = context.req.cookies;

    if (!cookies["roal_cases/payment-intent"] && !cookies["roal_cases/address-id"]) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            },
            props: {}
        }
    }

    const clientSecret = cookies["roal_cases/payment-intent"]

    console.log(clientSecret)

    return {
        props: {
            status: context.query.redirect_status,
            clientSecret,
            payment: context.query.payment_intent_client_secret
        }
    }
}

export default AfterPaymentPage;
