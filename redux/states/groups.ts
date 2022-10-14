import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group, SubCategory } from "../../models/category";

const initialState: Group[] = [];

export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        setGroups: (state: Group[], action: PayloadAction<Group[]>) => {
            return action.payload;
        },
        addGroup: (state: Group[], action: PayloadAction<Group>) => {
            return [
                ...state,
                action.payload
            ]
        },
        editGroup: (state: Group[], action: PayloadAction<Group>) => {
            const index = state.findIndex((group: Group) => group.id === action.payload.id)

            state[index] = action.payload;

            return state
        },
        removeGroup: (state: Group[], action: PayloadAction<number>) => {
            return state.filter((group: Group) => group.id !== action.payload)
        },
        addSubCategoriesToGroup: (state: Group[], action: PayloadAction<any>) => {
            let newState = state.map((group: Group) => group.id === action.payload.groupId ? {...group, subCategories: group.subCategories && [
                ...group.subCategories,
                ...action.payload.subCategories
            ]} : group)

            return newState;
        },
        deleteSubCategoryFromGroup: (state: Group[], action: PayloadAction<any>) => {
            return state.map((group: Group) => group.id === action.payload.groupId ? {...group, subCategories: group.subCategories?.filter((sub: SubCategory) => sub.id !== action.payload.id)} : group)
        },
        editSubCategoryFromGroup: (state: Group[], action: PayloadAction<any>) => {
            return state.map((group: Group) => group.id === action.payload.groupId ? {...group, subCategories: group.subCategories?.map((sub: SubCategory) => sub.id === action.payload.subCategory.id ? action.payload.subCategory : sub)} : group)
        }
    }
})

export const { editSubCategoryFromGroup, deleteSubCategoryFromGroup, addSubCategoriesToGroup, removeGroup, editGroup, addGroup, setGroups } = groupsSlice.actions

export default groupsSlice.reducer