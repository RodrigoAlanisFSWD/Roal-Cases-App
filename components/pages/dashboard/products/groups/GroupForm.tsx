import { faList } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react'
import * as Yup from 'yup'
import { Category, Group, SubCategory } from '../../../../../models/category';
import { useGroupService } from '../../../../../services/groupService';
import styles from '../../../../../styles/pages/dashboard/products/groups/GroupForm.module.scss'
import { Button } from '../../../../atoms/shared/Button';
import { FormControl } from '../../../../atoms/shared/FormControl';
import { AddCategoryModal } from '../../../../organisms/dashboard/products/groups/AddCategoryModal';
import { CategoryCreator } from '../../../../organisms/dashboard/products/groups/CategoryCreator';

interface GroupFormProps {
    group?: Group;
    edit?: boolean;
}

export const GroupForm: FC<GroupFormProps> = ({ group, edit }) => {
    const router = useRouter();

    const createGroupSchema = Yup.object().shape({
        name: Yup.string()
            .required(),
    })
    
    const [showModal, setShowModal] = useState(false)

    const [categories, setCategories] = useState<SubCategory[]>([])

    const handleAddCategory = (category: SubCategory) => {
        const exists = categories.find((i: SubCategory) => i.name === category.name)

        if (exists) return;

        setCategories([
            ...categories,
            category
        ])
    }

    const handleDelete = (name: string) => {
        const newCategories = categories.filter((cat: SubCategory) => cat.name !== name);

        setCategories(newCategories)
    }

    const { createGroup, createSubCategories, updateGroup } = useGroupService()

    return (
        <>
            <div className={styles['groupForm']}>
                <h2>
                    {!edit ? 'Crear Grupo' : 'Editar Grupo'}
                </h2>

                <Formik
                    initialValues={edit && group ? {
                        name: group.name
                    } : {
                        name: ""
                    }}
                    validationSchema={createGroupSchema}
                    onSubmit={async (data) => {
                        if (edit && group) {
                            await updateGroup({
                                ...group,
                                ...data
                            })
                        } else {
                            const newGroup = await createGroup(data)

                            if (categories.length > 0) {
                                await createSubCategories(categories, newGroup.id)
                            }
                        }
                        
                        router.push("/dashboard/products/groups")
                    }}
                >
                    {({ touched, errors, handleSubmit }) => (
                        <Form className={styles['groupForm__form']}>
                            <FormControl icon={faList} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} className={styles['groupForm__input']} />

                            {
                                !edit && (
                                    <CategoryCreator onDelete={handleDelete} categories={categories} onAdd={() => setShowModal(true)} />
                                )
                            }

                            <Button onClick={handleSubmit} text={!edit ? 'Crear' : 'Editar'}
                                className={styles['groupForm__btn']} />
                        </Form>
                    )}
                </Formik>
            </div>

            {
                showModal && <AddCategoryModal onAdd={handleAddCategory} onClose={() => setShowModal(false)} />
            }
        </>

    )
}
