import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { Protected } from '../../components/layouts/Protected'
import { BuyConfirmation } from '../../components/pages/shopping/BuyConfirmation'
import { setClientSecret } from '../../redux/states/payment'
import { AppStore } from '../../redux/store'
import { getCart } from '../../services/cartService'

const stripePromise = loadStripe(`pk_test_51LyNkyKPetfkQCPTSc9jm3HSkMjM1C5hkUJawieii7dfvERSxm6GEWOudV9HbQzXiPkoPIMtzzxTMoH9e1beab3I00Z1sI3gRC`, {
  locale: "es"
})


const BuyConfirmationPage: NextPage<any> = ({ apiKey }) => {

  const cart = useSelector((store: AppStore) => store.cart)
  const key = useSelector((store: AppStore) => store.payment.clientSecret)

  const router = useRouter()

  const dispatch = useDispatch()

  const cookies = new Cookies()

  const init = async () => {
    if (cart.products.length < 1) {
      router.push("/")
      return;
    }
    try {
      if (apiKey && !key) {
        const cart = await getCart()
        const secret = await axios.get("http://localhost:8080/api/payments/" + cart.id, {
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
    key ? (
      <Elements stripe={stripePromise} options={{
        clientSecret: key as string,
        appearance: {
          theme: "flat",
          variables: {
            fontFamily: 'sans-serif',
            fontLineHeight: '1.5',
            borderRadius: '5px',
            colorBackground: '#F6F6F6',
            colorPrimaryText: '#262626'
          },
          rules: {
            '.Block': {
              backgroundColor: '#F6F6F6',
              boxShadow: 'none',
              padding: '12px',
            },
            '.Input': {
              padding: '12px',
            },
            '.Input:disabled, .Input--invalid:disabled': {
              color: 'lightgray'
            },
            '.Tab': {
              padding: '10px 12px 8px 12px',
              border: 'none'
            },
            '.Tab:hover': {
              border: 'none',
              boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
            },
            '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
              border: 'none',
              backgroundColor: '#fff',
              boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
            },
            '.Label': {
              fontWeight: '500',

            }
          },
          labels: "above"
        }
      }}>
          <BuyConfirmation />
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

export default BuyConfirmationPage