import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react'
import { Group, SubCategory } from '../../../../models/category'
import { Switch } from '../../../atoms/shared/Switch';

interface SubCategorySelectItemProps extends Group {
    onAdd: (subCategory: SubCategory) => void;
    onRemove: (subCategory: SubCategory) => void;
    selected: SubCategory[]
}

export const SubCategorySelectItem: FC<SubCategorySelectItemProps> = ({ name, subCategories, onAdd, onRemove, selected }) => {

    const [deploy, setDeploy] = useState(false)

    return (
        <>
            <div className="h-[55px] border-b border-gray-200 justify-between flex p-4 w-full">
                <span className="text-xl">
                    {name}
                </span>

                <FontAwesomeIcon onClick={() => setDeploy(!deploy)} icon={deploy ? faAngleUp : faAngleDown} className="text-xl cursor-pointer" />
            </div>
            <div className="w-full flex flex-col">
                <AnimatePresence>
                    {
                        deploy && subCategories?.map((subCategory: SubCategory) => (
                            <SubCategoryItem selected={selected} key={subCategory.id} {...subCategory} onAdd={onAdd} onRemove={onRemove} />
                        ))
                    }
                </AnimatePresence>
            </div>
        </>
    )
}

interface SubCategoryItemProps extends SubCategory {
    onAdd: (subCategory: SubCategory) => void;
    onRemove: (subCategory: SubCategory) => void;
    selected: SubCategory[];
}

const SubCategoryItem: FC<SubCategoryItemProps> = (props) => {

    const { name, onAdd, onRemove, selected } = props;

    const [isActive, setIsActive] = useState(false)

    const handleSwitchChange = () => {

        if (isActive) {
            onRemove({
                id: props?.id,
                name: props.name,
                group: props?.group
            })
        } else {
            onAdd({
                id: props?.id,
                name: props.name,
                group: props?.group
            })
        }

        setIsActive(!isActive)
    }

    useEffect(() => {
        const exists = selected.find((i: SubCategory) => i.id === props.id)

        if (exists) {
            setIsActive(true)
        }
    }, [selected])

    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} className="w-full h-[45px] border-b border-gray-200 flex items-center px-4 justify-between">
            <span>
                {name}
            </span>

            <Switch isActive={isActive} onChange={() => handleSwitchChange()} />
        </motion.div>
    )
}