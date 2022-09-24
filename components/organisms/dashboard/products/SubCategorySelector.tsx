import React, { FC, useEffect, useState } from 'react'
import { Group, SubCategory } from '../../../../models/category';
import { useGroupService } from '../../../../services/groupService';
import { SubCategorySelectItem } from '../../../molecules/dashboard/products/SubCategorySelectItem';

interface SubCategorySelectorProps {
    subCategories: SubCategory[],
    onAdd: (subCategory: SubCategory) => void;
    onRemove: (subCategory: SubCategory) => void;
    className?: string;
}

export const SubCategorySelector: FC<SubCategorySelectorProps> = ({ onAdd, onRemove, subCategories, className }) => {

    const [groups, setGroups] = useState<Group[]>([]);

    const { getGroups } = useGroupService()

    useEffect(() => {
        const init = async () => {
            setGroups(await getGroups())
        }

        init()
    }, [])

    return (
        <div className={`w-full min-h-[200px] rounded-sm border border-gray-200 flex flex-col overflow-y-scroll ${className}`}>
            {
                groups.map((group: Group) => (
                    <SubCategorySelectItem selected={subCategories} onAdd={onAdd} onRemove={onRemove} key={group.id} {...group} />
                ))
            }
        </div>
    )
}
