import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { ShipmentForm } from '../../../components/pages/dashboard/shipments/ShipmentForm'

const CreateShipmentPage = () => {
  return (
    <Dashboard>
        <ShipmentForm />
    </Dashboard>
  )
}

export default CreateShipmentPage