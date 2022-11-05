import { faBox, faBoxArchive, faBuilding, faMap, faPerson } from '@fortawesome/free-solid-svg-icons'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import * as Yup from "yup"
import { createAddress } from '../../../../services/addressesService'
import { Button } from '../../../atoms/shared/Button'
import { FormControl } from '../../../atoms/shared/FormControl'

export const AddressForm = () => {

    const AddressSchema = Yup.object().shape({
        name: Yup.string()
        .required("EL Nombre Es Obligatorio"),
        street: Yup.string()
        .required("La Calle Es Obligatoria"),
        apartment: Yup.string(),
        postalCode: Yup.string()
        .required("Requerido")
        .length(5),
        state: Yup.string()
        .required("Requerido"),
    })

    const router = useRouter()

    const submit = async (data: any) => {
        await createAddress(data)

        router.push("/shopping/confirmation")
    }

  return (
    <div className="w-full max-w-2xl h-auto flex flex-col items-center 2xl:shadow-md">
            <h2 className="text-3xl mb-14 lg:mt-14">
                Añadir Direccion
            </h2>

            <div className="w-full bg-background p-4 text-xl text-center text-secondary">
                Ingresa Los Datos Para Continuar
            </div>

            <Formik
                initialValues={{
                    name: "",
                    street: "",
                    apartment: "",
                    postalCode: "",
                    state: ""
                }}
                validationSchema={AddressSchema}
                onSubmit={submit}
            >
                {({ values, touched, errors, handleSubmit }) => (
                    <Form className="w-full grid grid-cols-2 justify-center h-auto py-14 pb-0 px-6 xl:p-5 2xl:py-28 2xl:px-14 gap-x-5">
                        <FormControl className="mt-4" placeholder="Nombre" type="name"
                            name="name" icon={faPerson} error={errors.name} touched={touched.name} />
                        <FormControl className="mt-4" placeholder="Calle, Ejemplo: CALLE NUM. COLONIA" type="text"
                            name="street" icon={faBox} error={errors.street} touched={touched.street} />
                            <FormControl className="mt-4" placeholder="Apartamento OPCIONAL" type="text"
                            name="apartment" icon={faBuilding} error={errors.apartment} touched={touched.apartment} />
                            <FormControl className="mt-4" placeholder="Codigo Postal" type="text"
                            name="postalCode" icon={faBoxArchive} error={errors.postalCode} touched={touched.postalCode} />
                            <FormControl className="mt-4 col-span-2" placeholder="Estado, Ejemplo: Monterrey" type="text"
                            name="state" icon={faMap} error={errors.state} touched={touched.state} />

                        <Button onClick={handleSubmit} text="Agregar" className="mt-9 mb-4 col-span-2" />

                    </Form>
                )}
            </Formik>
        </div>
  )
}
