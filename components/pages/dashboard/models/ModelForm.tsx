import React, { FC, useEffect, useState } from 'react'
import { Model } from '../../../../models/models';
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import { createModel, getBrands, updateModel } from '../../../../services/modelsService';
import { useCategoriesSelector } from '../../../../hooks/categorySelector';
import { Form, Formik } from 'formik';
import { FormControl } from '../../../atoms/shared/FormControl';
import { CategorySelector } from '../../../organisms/dashboard/CategorySelector';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../atoms/shared/Button';
import { Select } from '../../../molecules/shared/Select';
import { SelectItemType } from '../../../../models/select';

interface ModelFormProps {
    edit?: boolean;
    model?: Model;
}

export const ModelForm: FC<ModelFormProps> = ({ edit, model }) => {

    const createModelSchema = Yup.object().shape({
        name: Yup.string()
            .required()
    })

    const router = useRouter();

    const onSubmit = async (data: any) => {
      if (categories.length < 1 || !selectedBrand) return 
      
        if (edit && model) {
            await updateModel({
                ...model,
                ...data,
                categories,
                brand: {
                    id: selectedBrand?.key
                }
            })
        } else {
            await createModel({
                ...data,
                categories,
                brand: {
                    id: selectedBrand?.key
                }
            })
        }
        
        router.push("/dashboard/models")
    }

    const { categories, handleAdd, handleRemove, setCategories } = useCategoriesSelector()

    useEffect(() => {
        if (edit && model) {
            setCategories(model.categories)
            setSelectedBrand({
                key: model.brand.id,
                text: model.brand.name
            })
        }

        const init = async () => {
            const brands = await getBrands()
            setBrands(brands.reduce((acc: any, cur: any) => acc = [...acc, { key: cur.id, text: cur.name }], []))
          }
      
          init()
    }, [])

    const [brands, setBrands] = useState<Array<SelectItemType>>([])

  const [selectedBrand, setSelectedBrand] = useState<SelectItemType | null>(null)

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <h2 className="text-3xl mb-14">
        {!edit ? 'Crear Modelo' : 'Editar Modelo'}
      </h2>

      <Formik
        initialValues={{
            name: model ? model.name : ""
        }}
        validationSchema={createModelSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors, handleSubmit }) => (
          <Form className="w-full sm:w-[450px] h-auto">
              <FormControl icon={faList} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} />

              <Select items={brands} selectedItem={selectedBrand} onSelect={(item: SelectItemType) => setSelectedBrand(item)} placeholder="Marca" className='w-full sm:w-[450px] mt-2' />

            <CategorySelector selected={categories} onAdd={handleAdd} onRemove={handleRemove} className="mt-3" />

            <Button onClick={handleSubmit} text={!edit ? 'Crear' : 'Editar'}
              className="mt-4 md:mt-6" />
          </Form>
        )}
      </Formik>
    </div>
  )
}
