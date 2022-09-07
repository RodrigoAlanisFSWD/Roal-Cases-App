import React, { useState } from 'react'
import styles from '../../../../../styles/pages/dashboard/products/categories/CreateCategory.module.scss'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { FormControl } from '../../../../atoms/shared/FormControl'
import { faList, faMoneyBill, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { Textarea } from '../../../../atoms/shared/Textarea'
import { Button } from '../../../../atoms/shared/Button'
import { FileSelect } from '../../../../atoms/shared/FileSelect'

export const CreateCategory = () => {

    const createCategorySchema = Yup.object().shape({
        name: Yup.string()
            .required(),
        description: Yup.string()
            .required(),
        price: Yup.number()
            .required()
            .min(10)
    })

    const [image, setImage] = useState(null)

    return (
        <div className={styles['createCategory']}>
            <h2>
                Crear Categoria
            </h2>

            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    price: 0
                }}
                validationSchema={createCategorySchema}
                onSubmit={(data) => {
                    console.log(data)
                }}
            >
                {({ values, touched, errors, handleSubmit }) => (
                    <Form className={styles['createCategory__form']}>
                        <FormControl icon={faShoppingBag} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} className={styles['createCategory__input']} />
                        <Textarea icon={faList} placeholder="Description" name="description" type="text" error={errors.description} touched={touched.description} className={styles['createCategory__input']} />
                        <FormControl icon={faMoneyBill} placeholder="Precio" name="price" type="number" error={errors.price} touched={touched.price} className={styles['createCategory__input']} />
                        <FileSelect selectedFile={image} placeholder='Selecciona Una Imagen' handleFile={(file) => {
                            setImage(file)
                        }} />

                        <Button text="Crear" className={styles['createCategory__btn']} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
