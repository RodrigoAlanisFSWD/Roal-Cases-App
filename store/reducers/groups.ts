import { Group, SubCategory } from '../../models/category';
import * as groupsTypes from '../types/groups';

const initialState: Group[] = [];

export function groupsReducer(state = initialState, action: any) {
    switch (action.type) {
        case groupsTypes.SET_GROUPS:
            return action.payload

        case groupsTypes.ADD_GROUP:
            state.push(action.payload)

            return state

        case groupsTypes.EDIT_GROUP:
            const index = state.findIndex((group: Group) => group.id === action.payload.id)

            state[index] = action.payload;

            return state

        case groupsTypes.REMOVE_GROUP:
            const groups = state.filter((group: Group) => group.id !== action.payload)

            return groups

        case groupsTypes.ADD_SUBCATEGORIES_TO_GROUP:

            let newState = state.map((group: Group) => group.id === action.payload.groupId ? {...group, subCategories: group.subCategories && [
                ...group.subCategories,
                ...action.payload.subCategories
            ]} : group)

            return newState

        case groupsTypes.DELETE_SUBCATEGORY_FROM_GROUP:
            newState = state.map((group: Group) => group.id === action.payload.groupId ? {...group, subCategories: group.subCategories?.filter((sub: SubCategory) => sub.id !== action.payload.id)} : group)

            return newState

        case groupsTypes.EDIT_SUBCATEGORY_FROM_GROUP:
            newState = state.map((group: Group) => group.id === action.payload.groupId ? {...group, subCategories: group.subCategories?.map((sub: SubCategory) => sub.id === action.payload.subCategory.id ? action.payload.subCategory : sub)} : group)

            return newState
        default:
            return state

    }
}
