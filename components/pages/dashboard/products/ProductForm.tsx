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

      setItems(categories.reduce((acc: any, cur: any) => acc = [...acc, { key: cur.id, text: cur.name }], []))
    }

    const initEdited = async () => {
      if (product && product.category && product.subCategories) {
        setSelectedCategory({
          key: product.category?.id,
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
      if (!image) {
        setImageError(true)
        return;
      }
      const newProduct: Product = {
        ...data,
        subCategories,
        category: await getCategory(selectedCategory?.key),
      }
      await createProduct(newProduct, image)
    } else {
      const newProduct: Product = {
        ...product,
        ...data,
        category: await getCategory(selectedCategory?.key),
        subCategories,
      }
      if (image) {
        await uploadProductImage(image, newProduct.id)
      }
      await updateProduct(newProduct)
    }

    router.push("/dashboard/products")
  }

  // Image Pick

  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [imageSuccess, setImageSuccess] = useState(false)

  return (
    <div className={styles['productForm']}>
      <h2>
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
          <Form className={styles['productForm__form']}>
            <div className={styles['productForm__form-wrapper']}>
              <FormControl icon={faList} placeholder="Nombre" name="name" type="text" error={errors.name} touched={touched.name} className={styles['productForm__input']} />
              <Textarea icon={faNewspaper} placeholder="Descripcion" name="description" type="text" error={errors.description} touched={touched.description} className={`${styles['productForm__input']} ${styles['productForm__textarea']}`} />
              <Select items={items} selectedItem={selectedCategory} onSelect={(item: SelectItemType) => setSelectedCategory(item)} placeholder="Categoria" />
              <SubCategorySelector className={styles['productForm__subCategories']} onAdd={handleAdd} onRemove={handleRemove} subCategories={subCategories} />
              <FileSelect className={styles['productForm__file']} error={imageError} success={imageSuccess} selectedFile={image} placeholder='Selecciona Una Imagen' handleFile={(file) => {
                setImageError(false)
                setImage(file)
                setImageSuccess(true)
              }} />
            </div>


            <Button onClick={handleSubmit} text={!edit ? 'Crear' : 'Editar'}
              className={styles['productForm__btn']} />
          </Form>
        )}
      </Formik>
    </div>
  )
}