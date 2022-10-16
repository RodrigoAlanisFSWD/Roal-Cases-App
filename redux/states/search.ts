import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../models/category";
import { SearchParams } from "../../models/search";

const initialState: SearchParams = {
    query: "",
    subCategories: [],
    category: null
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            return {
                ...state,
                query: action.payload,
            }
        },
        setSubCategories(state, action: PayloadAction<any>) {
            return {
                ...state,
                subCategories: action.payload
            }
        },
        addSubCategory(state, action: PayloadAction<string>) {
            if (state.subCategories.find((el: string) => el === action.payload)) {
                return
            }

            return {
                ...state,
                subCategories: [
                    ...state.subCategories,
                    action.payload
                ]
            }
        },
        removeSubCategory(state, action: PayloadAction<string>) {
            return {
                ...state,
                subCategories: state.subCategories.filter((el: string) => el !== action.payload)
            }
        },
        setCategory(state, action: PayloadAction<Category>) {
            return {
                ...state,
                category: action.payload
            }
        },
    }
})

export const { setQuery, setSubCategories, addSubCategory, removeSubCategory,setCategory } = searchSlice.actions

export default searchSlice.reducer
