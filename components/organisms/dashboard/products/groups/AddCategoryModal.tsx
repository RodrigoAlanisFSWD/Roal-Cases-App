import { faList, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import styles from '../../../../../styles/organisms/dashboard/products/groups/AddCategoryModal.module.scss'
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
        <div className={styles['wrapper']}>
            <div className={styles['addCategoryModal']}>
                <div className={styles['addCategoryModal__header']}>
                    <h4>
                        { title ? title  : 'Agregar Categoria' }
                    </h4>

                    <FontAwesomeIcon onClick={onClose} icon={faTimes} className={styles['addCategoryModal__header-icon']} />
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
                            <Form className={styles['addCategoryModal__form']}>
                                <FormControl icon={faList} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} className={styles['addCategoryModal__input']} />

                                <Button className={styles['addCategoryModal__btn']} onClick={handleSubmit} text={buttonText ? buttonText : "Agregar"} />
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}
