import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useState } from 'react'
import { SelectItemType } from '../../../models/select';
import styles from '../../../styles/molecules/shared/Select.module.scss'

interface SelectProps {
    placeholder: string;
    items: SelectItemType[];
    selectedItem: SelectItemType | null;
    onSelect: (item: SelectItemType) => void;
}

export const Select: FC<SelectProps> = ({ placeholder, items, selectedItem, onSelect }) => {
    const [showItems, setShowItems] = useState(false);

    return (
        <div className={styles['select']}>
            <div onClick={() => setShowItems(!showItems)} className={styles['select__deployer']}>
                <span>
                    {selectedItem !== null ? selectedItem.text : placeholder}
                </span>

                <FontAwesomeIcon icon={showItems ? faAngleUp : faAngleDown} className={styles['select__icon']} />
            </div>
            <AnimatePresence>
                {
                    showItems &&
                    (
                        <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }} className={styles['select__items']}>
                            {
                                items.map((item: SelectItemType) => (
                                    <div key={item.key} onClick={() => { 
                                        onSelect(item) 
                                        setShowItems(false)
                                    }} className={styles['select__item']}>
                                        {item.text}
                                    </div>
                                ))
                            }
                        </motion.div>
                    )
                }
            </AnimatePresence>

        </div>
    )
}
