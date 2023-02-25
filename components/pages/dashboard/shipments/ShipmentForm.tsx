import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { FC } from 'react'
import { Shipment } from '../../../../models/shipment';
import * as Yup from 'yup'
import { createShipment, updateShipment } from '../../../../services/shipmentService';
import { Button } from '../../../atoms/shared/Button';
import { FormControl } from '../../../atoms/shared/FormControl';
import { faBox, faCalendar, faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';

interface ShipmentFormProps {
    edit?: boolean;
    shipment?: Shipment;
}

export const ShipmentForm: FC<ShipmentFormProps> = ({ edit, shipment }) => {

    const router = useRouter();

    const createProductSchema = Yup.object().shape({
        name: Yup.string()
            .required(),
        price: Yup.number()
            .min(50)
            .required(),
        estimated: Yup.string()
            .required()
    })

    const onSubmit = async (data: any) => {
        if (!edit) {
            await createShipment({
                ...data,
            })
        } else {
            await updateShipment({
                ...shipment,
                ...data,
            })
        }

        router.push("/dashboard/shipments")
    }

    return (
        <div className="flex justify-center items-center h-full flex-col">
            <h2 className="text-4xl mb-14">
                {!edit ? 'Crear Tipo De Envio' : 'Editar Tipo De Envio'}
            </h2>

            <Formik
                initialValues={edit && shipment ? {
                    name: shipment.name,
                    price: shipment.price,
                    estimated: shipment.estimated
                } : {
                    name: "",
                    price: 0,
                    estimated: ""
                }}
                validationSchema={createProductSchema}
                onSubmit={onSubmit}
            >
                {({ touched, errors, handleSubmit }) => (
                    <Form className="w-full sm:w-[450px] h-auto">
                        <FormControl icon={faBox} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} className="mb-4" />
                        <FormControl icon={faMoneyBill1} placeholder="Precio" name="price" type="text" error={errors.price} touched={touched.price} className="mb-4" />
                        <FormControl icon={faCalendar} placeholder="Tiempo Estimado Ejemplo: 1 - 2" name="estimated" type="text" error={errors.estimated} touched={touched.estimated} />

                        <Button onClick={handleSubmit} text={!edit ? 'Crear' : 'Editar'}
                            className="mt-14" />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
