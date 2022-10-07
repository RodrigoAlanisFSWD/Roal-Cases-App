import React, { FC, useEffect, useState } from 'react'
import styles from '../../../../styles/pages/dashboard/products/ProductForm.module.scss'
import * as Yup from 'yup'
import { Product } from '../../../../models/product';
import { Form, Formik } from 'formik';
import { FormControl } from '../../../atoms/shared/FormControl';
import { faList, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../atoms/shared/Button';
import { Textarea } from '../../../atoms/shared/Textarea';
import { Select } from '../../../molecules/shared/Select';
import { SelectItemType } from '../../../../models/select';
import { useCategoryService } from '../../../../services/categoryService';
import { SubCategory } from '../../../../models/category';
import { SubCategorySelector } from '../../../organisms/dashboard/products/SubCategorySelector';
import { FileSelect } from '../../../atoms/shared/FileSelect';
import { useProductService } from '../../../../services/productService';
import { useRouter } from 'next/router';

interface ProductFormProps {
  edit?: boolean;
  product?: Product;
}

export const ProductForm: FC<ProductFormProps> = ({ edit, product }) => {

  const router = useRouter();

  const createProductSchema = Yup.object().shape({
    name: Yup.string()
      .required(),
    description: Yup.string()
      .required(),
  })

  const [items, setItems] = useState<SelectItemType[]>([])

  const [selectedCategory, setSelectedCategory] = useState<SelectItemType | null>(null)

  const { getCategories, getCategory } = useCategoryService()
  const { createProduct, updateProduct, uploadProductImage } = useProductService();

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

  const [subCategories, setSubCategories] = useState<SubCategory[]>([])

  const handleAdd = (subCategory: SubCategory) => {
    setSubCategories([
      ...subCategories,
      subCategory
    ])
  }

  const handleRemove = (subCategory: SubCategory) => {
    setSubCategories(
      subCategories.filter((sub: SubCategory) => sub.id !== subCategory.id)
    )
  }

  const onSubmit = async (data: any) => {
    if (!edit) {
      const newProduct: Product = {
        ...data,
        subCategories,
        category: await getCategory(selectedCategory?.key as string),
      }
      await createProduct(newProduct)
    } else {
      const newProduct: Product = {
        ...product,
        ...data,
        category: await getCategory(selectedCategory?.key as string),
        subCategories,
      }
      await updateProduct(newProduct)
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
