import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Products } from '../../components/pages/products/Products'
import { Category } from '../../models/category'
import { Product } from '../../models/product'
import api from '../../interceptors/axios'
import { setProducts } from '../../redux/states/products'
import { setCategory, setQuery, setSubCategories } from '../../redux/states/search'

interface ProductsPageProps {
  products: Product[];
  category?: Category | null;
  subCategories: string[];
  query: string | null;
}

const ProductsPage: NextPage<ProductsPageProps> = ({ products, category, subCategories, query }) => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProducts(products))
    if (category) {
      dispatch(setCategory(category))
    }
    dispatch(setSubCategories(subCategories ? subCategories : []))
    if (query) {
      dispatch(setQuery(query))
    }
  }, [products])

  return (
      <Products category={category} />
  )
}

export async function getServerSideProps({ query }: any) {

  const { data } = await api.post("/products/search", {
    category: query.category ? {
      slug: query.category 
    } : null,
    query: query.query ? query.query : null,
    subCategories: query.subCategories ? query.subCategories.split(",") : null
  })

  let category = null;

  if (query.category) {
    category = (await api.get("/categories/" + query.category)).data
  }

  return {
    props: {
      products: data,
      category: category,
      subCategories: query.subCategories ? query.subCategories.split(",") : [],
      query: query.query ? query.query : null
    }
  }
}

export default ProductsPage