import { faList } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux';
import * as Yup from 'yup'
import { Category, Group, SubCategory } from '../../../../../models/category';
import { addGroup, addSubCategoriesToGroup, editGroup } from '../../../../../redux/states/groups';
import { createGroup, updateGroup } from '../../../../../services/groupsService';
import { createSubCategories } from '../../../../../services/subCategoriesService';
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

    const dispatch = useDispatch();

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

        setShowModal(false)
    }

    const handleDelete = (name: string) => {
        const newCategories = categories.filter((cat: SubCategory) => cat.name !== name);

        setCategories(newCategories)
    }

    return (
        <>
            <div className="flex justify-center items-center flex-col h-full">
                <h2 className="text-4xl mb-14">
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
                            const edited = await updateGroup({
                                ...group,
                                ...data
                            })

                            dispatch(editGroup(edited))
                        } else {
                            const newGroup = await createGroup(data)

                            dispatch(addGroup(newGroup))

                            if (categories.length > 0) {
                                const subCategories = await createSubCategories(categories, newGroup.id)

                                dispatch(addSubCategoriesToGroup({
                                    subCategories,
                                    groupId: newGroup.id
                                }))
                            }
                        }
                        
                        router.push("/dashboard/products/groups")
                    }}
                >
                    {({ touched, errors, handleSubmit }) => (
                        <Form className="w-full sm:w-[450px] h-auto">
                            <FormControl icon={faList} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} className="mb-4" />

                            {
                                !edit && (
                                    <CategoryCreator onDelete={handleDelete} categories={categories} onAdd={() => setShowModal(true)} />
                                )
                            }

                            <Button onClick={handleSubmit} text={!edit ? 'Crear' : 'Editar'}
                                className="mt-14" />
                        </Form>
                    )}
                </Formik>
            </div>

            {
                showModal && <AddCategoryModal onAdd={handleAddCategory} />
            }
        </>

    )
}
