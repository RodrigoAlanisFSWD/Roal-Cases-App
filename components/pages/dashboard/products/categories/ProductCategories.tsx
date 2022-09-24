import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useCategoryService } from '../../../../../services/categoryService'
import { Button } from '../../../../atoms/shared/Button';
import { CategoryList } from '../../../../organisms/dashboard/products/categories/CategoryList';

export const ProductCategories = () => {

    const { getCategories } = useCategoryService();

    useEffect(() => {
        const init = async () => {
            await getCategories()
        }

        init()
    }, [])

    const router = useRouter();

    return (
        <div>
            <h2 className="text-2xl mb-6 sm:text-3xl">
                Categorias
            </h2>
            
            <CategoryList />

            <Button onClick={() => router.push("/dashboard/products/categories/create")} text="Crear Categoria" className="mt-6 w-full sm:w-[250px]" />
        </div>
    )
}
