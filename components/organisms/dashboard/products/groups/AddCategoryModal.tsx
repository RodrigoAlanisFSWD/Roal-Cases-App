import { faList, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { FormControl } from '../../../../atoms/shared/FormControl'
import { Button } from '../../../../atoms/shared/Button'
import { SubCategory } from '../../../../../models/category'

interface AddCategoryModalProps {
    onClose: () => void;
    onAdd: (category: SubCategory) => void;
    buttonText?: string;
    title?: string;
    subCategory?: SubCategory | null;
}

export const AddCategoryModal: FC<AddCategoryModalProps> = ({ onClose, onAdd, buttonText, title, subCategory }) => {
    const addCategorySchema = Yup.object().shape({
        name: Yup.string()
            .required(),
    })

    return (
        <div className="w-[calc(100vw-50px)] xl:w-[calc(100vw-350px)] h-[calc(100vh-60px)] bg-modal flex justify-center items-center absolute bottom-0 right-0">
            <div className="w-[calc(100%-25px)] sm:w-[450px] bg-white p-4 rounded-sm">
                <div className="flex justify-between items-center">
                    <h4 className="text-2xl">
                        { title ? title  : 'Agregar Categoria' }
                    </h4>

                    <FontAwesomeIcon onClick={onClose} icon={faTimes} className="text-2xl" />
                </div>

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
                        })

                        onClose();
                    }}
                >
                    {
                        ({ errors, touched, handleSubmit }) => (
                            <Form className="mt-4">
                                <FormControl icon={faList} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} className="mt-6" />

                                <Button className="mt-6" onClick={handleSubmit} text={buttonText ? buttonText : "Agregar"} />
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}
