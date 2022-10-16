import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../models/category";

const initialState: Category[] = [];

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state: Category[], action: PayloadAction<Category[]>) => {
            return action.payload
        },
        addCategory: (state: Category[], action: PayloadAction<Category>) => {
            return [
                ...state,
                action.payload
            ]
        },
        editCategory: (state: Category[], action: PayloadAction<Category>) => {
            const index = state.findIndex((category: Category) => category.id === action.payload.id)

            const newState = state;

            newState[index] = action.payload;

            return newState;
        },
        removeCategory: (state: Category[], action: PayloadAction<number>) => {
            return state.filter((category: Category) => category.id !== action.payload)
        },
    }
})

export const { setCategories, addCategory, editCategory, removeCategory } = categoriesSlice.actions

export default categoriesSlice.reducer