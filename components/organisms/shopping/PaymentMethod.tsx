import { CardElement, CartElement, PaymentElement, useElements } from '@stripe/react-stripe-js'
import React from 'react'

export const PaymentMethod = () => {

  return (
    <div className='w-full shadow-lg'>
      <form action="">
        <PaymentElement />
      </form>
    </div>
  )
}
