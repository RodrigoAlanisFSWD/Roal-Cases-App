import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { Protected } from '../../../components/layouts/Protected'
import { DiscountForm } from '../../../components/pages/dashboard/discounts/DiscountForm'
import { ShipmentForm } from '../../../components/pages/dashboard/shipments/ShipmentForm'

const CreateShipmentPage = () => {
  return (
    <Dashboard>
      <DiscountForm />
    </Dashboard>
  )
}

export default CreateShipmentPage