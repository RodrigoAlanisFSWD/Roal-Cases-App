import { Group, SubCategory } from "../../models/category";
import * as groupsTypes from '../types/groups';

export const setGroups = (categories: Group[]) => ({
    type: groupsTypes.SET_GROUPS,
    payload: categories
})

export const addGroup = (group: Group) => ({
    type: groupsTypes.ADD_GROUP,
    payload: group
})

export const editGroup = (group: Group) => ({
    type: groupsTypes.EDIT_GROUP,
    payload: group
})

export const removeGroup = (id: any) => ({
    type: groupsTypes.REMOVE_GROUP,
    payload: id
})

export const addSubCategoriesToGroup = (subCategories: SubCategory[], groupId: any) => ({
    type: groupsTypes.ADD_SUBCATEGORIES_TO_GROUP,
    payload: {
        subCategories,
        groupId
    }
})

export const deleteSubCategoryFromGroup = (id: any, groupId: any) => ({
    type: groupsTypes.DELETE_SUBCATEGORY_FROM_GROUP,
    payload: {
        id,
        groupId
    },
})

export const editSubCategoryFromGroup = (subCategory: SubCategory, groupId: number) => ({
    type: groupsTypes.EDIT_SUBCATEGORY_FROM_GROUP,
    payload: {
        groupId,
        subCategory
    }
})