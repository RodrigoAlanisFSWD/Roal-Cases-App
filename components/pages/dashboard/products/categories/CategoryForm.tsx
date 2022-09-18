import React, { FC, useState } from 'react'
import styles from '../../../../../styles/pages/dashboard/products/categories/CreateCategory.module.scss'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { FormControl } from '../../../../atoms/shared/FormControl'
import { faList, faMoneyBill, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { Textarea } from '../../../../atoms/shared/Textarea'
import { Button } from '../../../../atoms/shared/Button'
import { FileSelect } from '../../../../atoms/shared/FileSelect'
import { useCategoryService } from '../../../../../services/categoryService'
import { Router, useRouter } from 'next/router'
import { Category } from '../../../../../models/category'

interface CategoryFormProps {
    category?: Category;
    edit?: boolean;
}

export const CategoryForm: FC<CategoryFormProps> = ({ category, edit }) => {

    const router = useRouter();

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
    const [imageError, setImageError] = useState(false)
    const [imageSuccess, setImageSuccess] = useState(false)

    const { createCategory, updateCategory } = useCategoryService()

    return (
        <div className={styles['createCategory']}>
            <h2>
                {!edit ? 'Crear Categoria' : 'Editar Categoria'}
            </h2>

            <Formik
                initialValues={edit ? {
                    name: category?.name,
                    description: category?.description,
                    price: category?.price
                } : {
                    name: '',
                    description: '',
                    price: 0
                }}
                validationSchema={createCategorySchema}
                onSubmit={async (data) => {
                    if (!edit) {
                        if (!image) {
                            setImageError(true)
                            return;
                        }
    
                        await createCategory(data, image)
                    } else {
                        await updateCategory({
                            ...category,
                            ...data
                        })
                    }
                    

                    router.push("/dashboard/products/categories/")
                }}
            >
                {({ values, touched, errors, handleSubmit }) => (
                    <Form className={styles['createCategory__form']}>
                        <FormControl icon={faShoppingBag} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} className={styles['createCategory__input']} />
                        <Textarea icon={faList} placeholder="Description" name="description" type="text" error={errors.description} touched={touched.description} className={styles['createCategory__input']} />
                        <FormControl icon={faMoneyBill} placeholder="Precio" name="price" type="number" error={errors.price} touched={touched.price} className={styles['createCategory__input']} />
                        {
                            !edit && (
                                <FileSelect error={imageError} success={imageSuccess} selectedFile={image} placeholder='Selecciona Una Imagen' handleFile={(file) => {
                                    setImageError(false)
                                    setImage(file)
                                    setImageSuccess(true)
                                }} />
                            )
                        }


                        <Button onClick={handleSubmit} text={!edit ? 'Crear' : 'Editar'}
                            className={styles['createCategory__btn']} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
