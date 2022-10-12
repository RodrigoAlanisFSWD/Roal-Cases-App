import { SubCategory } from "../../models/category";
import { SearchParams } from "../../models/search";
import * as types from "../types/search"

const initialState: SearchParams = {
    category: null,
    subCategories: [],
    query: ""
}

export function searchReducer(state: SearchParams = initialState, { type, payload }: any) {
    switch(type) {
        case types.SET_CATEGORY:
            return {
                ...state,
                category: payload
            }
        case types.SET_QUERY:
            return {
                ...state,
                query: payload
            }
        case types.ADD_SUBCATEGORY:
            if (state.subCategories.find((i: any) => i === payload)) return;

            return {
                ...state,
                subCategories: [
                    ...state.subCategories,
                    payload
                ]
            }

        case types.SET_SUBCATEGORIES:
            return {
                ...state,
                subCategories: payload
            }

        case types.REMOVE_SUBCATEGORY: 
            return {
                ...state,
                subCategories: state.subCategories.filter((sub: string) => sub !== payload)
            }
        default:
            return state
    }
}