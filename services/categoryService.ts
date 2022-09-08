import { useDispatch } from "react-redux"
import { Category } from "../models/category";
import { CategoryRepository } from "../repo/categoryRepository";
import { addCategory, setCategories, editCategory, removeCategory } from '../store/actions/categories'

export const useCategoryService = () => {

    const dispatch = useDispatch();
    const categoryRepository = new CategoryRepository();

    const getCategories = async () => {
        const categories = await categoryRepository.getCategories()

        dispatch(setCategories(categories))
    }

    const createCategory = async (values: any, file: any) => {
        const formData = new FormData()

        formData.set("image", file)

        const category = await categoryRepository.createCategory(values, formData)

        dispatch(addCategory(category))
    }

    const getCategory = async (id: any) => {
        const category = await categoryRepository.getCategory(id)

        return category
    }

    const updateCategory = async (category: any) => {
        const edited = await categoryRepository.editCategory(category);

        dispatch(editCategory(edited))
    }

    const deleteCategory = async (id: any) => {
        await categoryRepository.deleteCategory(id);

        dispatch(removeCategory(id))
    }

    return {
        getCategories,
        createCategory,
        getCategory,
        updateCategory,
        deleteCategory
    }
}