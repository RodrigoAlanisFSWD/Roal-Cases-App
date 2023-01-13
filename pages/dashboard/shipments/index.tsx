import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { Shipments } from '../../../components/pages/dashboard/shipments/Shipments'
import { getShipments } from '../../../services/shipmentService'

const ShipmentsPage: NextPage<any> = ({ shipments }) => {
  return (
    <Dashboard>
      <Shipments shipments={shipments} />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const shipments = await getShipments();

  return {
    props: {
      shipments,
    }
  }
}

export default ShipmentsPage