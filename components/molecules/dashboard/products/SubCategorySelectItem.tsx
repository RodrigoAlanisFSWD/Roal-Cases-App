import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react'
import { Group, SubCategory } from '../../../../models/category'
import styles from '../../../../styles/organisms/dashboard/products/SubCategorySelector.module.scss';
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
            <div className={styles['subCategorySelector__item']}>
                <span>
                    {name}
                </span>

                <FontAwesomeIcon onClick={() => setDeploy(!deploy)} icon={deploy ? faAngleUp : faAngleDown} className={styles['subCategorySelector__item-icon']} />
            </div>
            <div className={styles['subCategorySelector__item-subcategories']}>
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
            transition={{ duration: 0.3 }} className={styles['subCategorySelector__item-subcategory']}>
            <span>
                {name}
            </span>

            <Switch isActive={isActive} onChange={() => handleSwitchChange()} />
        </motion.div>
    )
}