import { Category } from '../../models/category';
import * as categoriesTypes from '../types/categories';

const initialState: Category[] = [];

export function categoriesReducer(state = initialState, action: any) {
    switch (action.type) {
        case categoriesTypes.SET_CATEGORIES:
            return action.payload

        case categoriesTypes.ADD_CATEGORY:
            state.push(action.payload)

            return state

        case categoriesTypes.EDIT_CATEGORY:
            const index = state.findIndex((cat: Category) => cat.id === action.payload.id)

            state[index] = action.payload;

            return state

        case categoriesTypes.REMOVE_CATEGORY:
            const categories = state.filter((cat: Category) => cat.id !== action.payload)

            return categories
        default:
            return state

    }
}