import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Main } from '../../components/layouts/Main'
import { Protected } from '../../components/layouts/Protected'
import { Payment } from '../../components/pages/shopping/Payment'
import { setClientSecret } from '../../redux/states/payment'
import { AppStore } from '../../redux/store'
import { getCart } from '../../services/cartService'
import Cookies from 'universal-cookie'
import api from '../../interceptors/axios'

// Secure This With Env
const stripePromise = loadStripe(`pk_test_51LyNkyKPetfkQCPTSc9jm3HSkMjM1C5hkUJawieii7dfvERSxm6GEWOudV9HbQzXiPkoPIMtzzxTMoH9e1beab3I00Z1sI3gRC`, {
  locale: "es"
})

const PaymentPage: NextPage<any> = ({ apiKey }) => {

  const cart = useSelector((store: AppStore) => store.cart)
  const user = useSelector((store: AppStore) => store.auth.profile)
  const { clientSecret, selectedDiscount, selectedShipment } = useSelector((store: AppStore) => store.payment)

  const router = useRouter()

  const dispatch = useDispatch()

  const cookies = new Cookies()

  const init = async () => {
    if (cart.products.length < 1) {
      router.push("/")
      return;
    }
    try {
      if (apiKey && !clientSecret) {
        const cart = await getCart()
        const secret = await api.post("/api/payments/", {
          userId: user?.id,
          shipmentId: selectedShipment?.id,
          discountId: selectedDiscount ? selectedDiscount.id : 0
        }, {
          headers: {
            Authorization: `Bearer sk_test_51LyNkyKPetfkQCPTULboJTU5KLygsDBuZIBUiaS2L1b4qnS8SOwkjiyT3vgjnPMQf8sN7Rpkwp6MOjel5Hph6esi00QxaW0vv7`
          }
        })

        dispatch(setClientSecret(secret.data.client_secret))

      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    init()
  }, [])

  return <Protected>
    {
      clientSecret ? (
        <Elements stripe={stripePromise} options={{
          clientSecret: clientSecret as string,
          appearance: {
            theme: "flat",
            variables: {
              fontFamily: 'system-ui',
              borderRadius: '2px',
              colorBackground: '#fff',
              colorPrimaryText: '#555555',
              colorSuccess: "#89A3C6",
              colorDanger: "#FF4B4B",
              colorSuccessText: "#89A3C6",
              colorDangerText: "#FF4B4B"
            },
            rules: {
              '.Block': {
                backgroundColor: '#F6F6F6',
                boxShadow: 'none',
                padding: '12px',
                color: '#555'
              },
              '.Input': {
                padding: '12px',
                border: '1px solid rgb(229 231 235)',
                color: '#888'

              },
              '.Input:disabled, .Input--invalid:disabled': {
                color: 'lightgray'
              },
              '.Input:focus': {
                boxShadow: 'none',
                color: '#555'
              },
              '.Label': {
                fontWeight: '500',
                color: '#555',
              }
            },
            labels: "above"
          }
        }}>
          <Main>

            <Payment />

          </Main>
        </Elements>
      ) : (
        <></>
      )
    }
  </Protected>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      apiKey: process.env.STRIPE_SK as string
    }
  }
}

export default PaymentPage;
