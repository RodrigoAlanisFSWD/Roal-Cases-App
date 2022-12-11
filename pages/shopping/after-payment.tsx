import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect } from 'react'
import { Main } from '../../components/layouts/Main';
import { AfterPayment } from '../../components/pages/shopping/AfterPayment';

interface AfterPaymentProps {
    session: string
}

const AfterPaymentPage: NextPage<AfterPaymentProps> = ({ session }) => {

    return (
            <Main>
                <AfterPayment session={session} />
            </Main>

    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    if (!context.query["session_id"]) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            },
            props: {}
        }
    }


    return {
        props: {
            session: context.query["session_id"],
        }
    }
}

export default AfterPaymentPage;
