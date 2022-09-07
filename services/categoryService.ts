import { useDispatch } from "react-redux"
import { CategoryRepository } from "../repo/categoryRepository";
import { setCategories } from '../store/actions/categories'

export const useCategoryService = () => {

    const dispatch = useDispatch();
    const categoryRepository = new CategoryRepository();

    const getCategories = async () => {
        const categories = await categoryRepository.getCategories()

        dispatch(setCategories(categories))
    }

    return {
        getCategories
    }
}