import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { ModelForm } from '../../../components/pages/dashboard/models/ModelForm'
import { Model } from '../../../models/models'
import { getModel } from '../../../services/modelsService'

interface EditModelProps {
    model: Model
}

const EditModelPage: NextPage<EditModelProps> = ({ model }) => {
  return (
    <Dashboard>
        <ModelForm edit={true} model={model} />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const model = await getModel(context.query.id)

    return {
        props: {
            model,
        }
    }
}

export default EditModelPage