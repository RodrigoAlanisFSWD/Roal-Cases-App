import React, { FC, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Product } from '../../../../models/product';
import { Form, Formik } from 'formik';
import { FormControl } from '../../../atoms/shared/FormControl';
import { faList, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../atoms/shared/Button';
import { Textarea } from '../../../atoms/shared/Textarea';
import { Select } from '../../../molecules/shared/Select';
import { SelectItemType } from '../../../../models/select';
import { SubCategory } from '../../../../models/category';
import { SubCategorySelector } from '../../../organisms/dashboard/products/SubCategorySelector';
import { useRouter } from 'next/router';
import { getCategories, getCategory } from '../../../../services/categoriesService';
import { createProduct, updateProduct } from '../../../../services/productsService';
import { useDispatch } from 'react-redux';
import { addProduct, editProduct } from '../../../../redux/states/products';
import { useSubCategoriesSelector } from '../../../../hooks/categorySelector';

interface ProductFormProps {
  edit?: boolean;
  product?: Product;
}

export const ProductForm: FC<ProductFormProps> = ({ edit, product }) => {

  const router = useRouter();

  const dispatch = useDispatch();

  const createProductSchema = Yup.object().shape({
    name: Yup.string()
      .required(),
    description: Yup.string()
      .required(),
  })

  const [items, setItems] = useState<SelectItemType[]>([])

  const { subCategories, setSubCategories, handleAdd, handleRemove } = useSubCategoriesSelector()

  const [selectedCategory, setSelectedCategory] = useState<SelectItemType | null>(null)

  useEffect(() => {
    const init = async () => {
      const categories = await getCategories()

      setItems(categories.reduce((acc: any, cur: any) => acc = [...acc, { key: cur.slug, text: cur.name }], []))
    }

    const initEdited = async () => {
      if (product && product.category && product.subCategories) {
        setSelectedCategory({
          key: product.category?.slug,
          text: product.category?.name
        })

        setSubCategories(product.subCategories)
      }
    }

    init().then(() => {
      if (edit) {
        initEdited()
      }
    });
  }, [])

  const onSubmit = async (data: any) => {
    if (!edit) {
      const newProduct: Product = {
        ...data,
        subCategories,
        category: await getCategory(selectedCategory?.key as string),
      }
      const product = await createProduct(newProduct)

      dispatch(addProduct(product))
    } else {
      const newProduct: Product = {
        ...product,
        ...data,
        category: await getCategory(selectedCategory?.key as string),
        subCategories,
      }
      const edited = await updateProduct(newProduct)

      dispatch(editProduct(edited))
    }

    router.push("/dashboard/products")
  }

  return (
    <div className="flex justify-center items-center h-full flex-col">
      <h2 className="hidden lg:block text-3xl mb-14">
        {!edit ? 'Crear Producto' : 'Editar Producto'}
      </h2>

      <Formik
        initialValues={edit && product ? {
          name: product.name,
          description: product.description
        } : {
          name: "",
          description: ""
        }}
        validationSchema={createProductSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors, handleSubmit }) => (
          <Form className="w-full sm:w-auto h-full lg:h-auto">
            <div className="w-full grid grid-cols-1 sm:grid-cols-[450px] lg:grid-cols-[450px_450px] lg:grid-rows-[1fr_200px] gap-4">
              <FormControl icon={faList} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} />
              <Textarea icon={faNewspaper} placeholder="Descripcion" name="description" type="text" error={errors.description} touched={touched.description} className="lg:col-[1/2] lg:row-[2/3] h-full" />
              <Select items={items} selectedItem={selectedCategory} onSelect={(item: SelectItemType) => setSelectedCategory(item)} placeholder="Categoria" />
              <SubCategorySelector className="lg:row-[2/3] h-full" onAdd={handleAdd} onRemove={handleRemove} subCategories={subCategories} />
            </div>


            <Button onClick={handleSubmit} text={!edit ? 'Crear' : 'Editar'}
              className="mt-4 md:mt-6" />
          </Form>
        )}
      </Formik>
    </div>
  )
}
