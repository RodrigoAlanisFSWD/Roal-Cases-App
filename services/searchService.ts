import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Product } from '../models/product'
import api from '../plugins/axios'
import { setProducts } from '../store/actions/products'
import { StoreState } from "../store/index"

export const useSearchService = () => {

    const dispatch = useDispatch()

    const searchParams = useSelector((store: StoreState) => store.search)

    const router = useRouter()

    const search = async () => {
        router.push(`/products?${searchParams.category ? "category=" + searchParams.category.slug : ""}${searchParams.subCategories.length > 0 ? "&subCategories=" + searchParams.subCategories.join(",") : ""}${searchParams.query.length > 0 ? "&query=" + searchParams.query : ""}`)
        console.log(searchParams)
    }

    return {
        search
    }
}