import { faList } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react'
import * as Yup from 'yup'
import { useCategoriesSelector } from '../../../../../hooks/categorySelector';
import { Brand } from '../../../../../models/models';
import { createBrand, updateBrand } from '../../../../../services/modelsService';
import { Button } from '../../../../atoms/shared/Button';
import { FormControl } from '../../../../atoms/shared/FormControl';
import { CategorySelector } from '../../../../organisms/dashboard/CategorySelector';

interface BrandForm {
    edit?: boolean;
    brand?: Brand;
}

export const BrandForm: FC<BrandForm> = ({ edit, brand }) => {

    const createBrandSchema = Yup.object().shape({
        name: Yup.string()
            .required()
    })

    const router = useRouter();

    const onSubmit = async (data: any) => {
      if (categories.length < 1) return 

        if (edit && brand) {
            await updateBrand({
                ...brand,
                ...data,
                categories,
            })
        } else {
            await createBrand({
                ...data,
                categories,
            })
        }
        
        router.push("/dashboard/models/brands")
    }

    const { categories, handleAdd, handleRemove, setCategories } = useCategoriesSelector()

    useEffect(() => {
        if (edit && brand) {
            setCategories(brand.categories)
        }
    }, [])

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <h2 className="text-3xl mb-14">
        {!edit ? 'Crear Marca' : 'Editar Marca'}
      </h2>

      <Formik
        initialValues={{
            name: brand ? brand.name : ""
        }}
        validationSchema={createBrandSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors, handleSubmit }) => (
          <Form className="w-full sm:w-[450px] h-auto">
              <FormControl icon={faList} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} />

            <CategorySelector selected={categories} onAdd={handleAdd} onRemove={handleRemove} className="mt-3" />

            <Button onClick={handleSubmit} text={!edit ? 'Crear' : 'Editar'}
              className="mt-4 md:mt-6" />
          </Form>
        )}
      </Formik>
    </div>
  )
}
