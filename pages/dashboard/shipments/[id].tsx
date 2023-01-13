import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { ShipmentForm } from '../../../components/pages/dashboard/shipments/ShipmentForm'
import { getShipment } from '../../../services/shipmentService'

const EditShipmentPage: NextPage<any> = ({ shipment }) => {
  return (
    <Dashboard>
        <ShipmentForm edit={true} shipment={shipment} />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    try {
    const shipment = await getShipment(context.query.id)

    return {
        props: {
            shipment,
        }
    }
        
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/dashboard/shipping"
            }
        }
    }
    
}

export default EditShipmentPage
