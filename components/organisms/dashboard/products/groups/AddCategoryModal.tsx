import { faList, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { FormControl } from '../../../../atoms/shared/FormControl'
import { Button } from '../../../../atoms/shared/Button'
import { SubCategory } from '../../../../../models/category'

interface AddCategoryModalProps {
    onAdd: (category: SubCategory) => void;
    buttonText?: string;
    subCategory?: SubCategory | null;
}

export const AddCategoryModal: FC<AddCategoryModalProps> = ({ onAdd, buttonText, subCategory }) => {
    const addCategorySchema = Yup.object().shape({
        name: Yup.string()
            .required(),
    })

    return (
                <Formik
                    initialValues={subCategory ? {
                        name: subCategory.name
                    } : {
                        name: ""
                    }}
                    validationSchema={addCategorySchema}
                    onSubmit={(data) => {
                        onAdd({
                            name: data.name
                        } as SubCategory)
                    }}
                >
                    {
                        ({ errors, touched, handleSubmit }) => (
                            <Form>
                                <FormControl icon={faList} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} />

                                <Button className="mt-6" onClick={handleSubmit} text={buttonText ? buttonText : "Agregar"} />
                            </Form>
                        )
                    }
                </Formik>

    )
}
