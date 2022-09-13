import { useDispatch } from "react-redux"
import { Group, SubCategory } from "../models/category";
import { GroupRepository } from "../repo/groupRepository";
import { addGroup, addSubCategoriesToGroup, deleteSubCategoryFromGroup, editGroup, editSubCategoryFromGroup, removeGroup, setGroups } from "../store/actions/groups";

export const useGroupService = () => {

    const dispatch = useDispatch();
    const groupRepository = new GroupRepository();

    const getGroups = async () => {
        const groups = await groupRepository.getGroups()

        dispatch(setGroups(groups))
    }

    const createGroup = async (values: any): Promise<Group> => {
        const group = await groupRepository.createGroup(values)

        dispatch(addGroup(group))

        return group;
    }

    const createSubCategories = async (subCategories: SubCategory[], groupId: number) => {
        const newSubCategories = await groupRepository.createSubCategories(subCategories, groupId)

        dispatch(addSubCategoriesToGroup(newSubCategories, groupId))
    }

    const getGroup = async (id: any) => {
        const group = await groupRepository.getGroup(id)

        return group    }

    const updateGroup = async (category: any) => {
        const edited = await groupRepository.editGroup(category);

        dispatch(editGroup(edited))
    }

    const deleteGroup = async (id: any) => {
        await groupRepository.deleteGroup(id);

        dispatch(removeGroup(id))
    }

    const deleteSubCategory = async (subCategory: SubCategory, groupId: any) => {
        await groupRepository.deleteSubCategory(subCategory)

        dispatch(deleteSubCategoryFromGroup(subCategory.id, groupId))
    }

    const updateSubCategory = async (subCategory: SubCategory, groupId: any) => {
        const updated = await groupRepository.updateSubCategory(subCategory)

        dispatch(editSubCategoryFromGroup(updated, groupId))
    }

    return {
        getGroups,
        getGroup,
        updateGroup,
        createGroup,
        deleteGroup,
        createSubCategories,
        deleteSubCategory,
        updateSubCategory
    }
}