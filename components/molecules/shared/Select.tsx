import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useState } from 'react'
import { SelectItemType } from '../../../models/select';

interface SelectProps {
    placeholder: string;
    items: SelectItemType[];
    selectedItem: SelectItemType | null;
    onSelect: (item: SelectItemType) => void;
}

export const Select: FC<SelectProps> = ({ placeholder, items, selectedItem, onSelect }) => {
    const [showItems, setShowItems] = useState(false);

    return (
        <div className="w-full flex flex-col">
            <div onClick={() => setShowItems(!showItems)} className="h-[55px] border border-gray-200 rounded-sm flex justify-between items-center px-4">
                <span className='text-xl'>
                    {selectedItem !== null ? selectedItem.text : placeholder}
                </span>

                <FontAwesomeIcon icon={showItems ? faAngleUp : faAngleDown} className="text-xl" />
            </div>
            <AnimatePresence>
                {
                    showItems &&
                    (
                        <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }} className="border md:absolute rounded-b-sm md:mt-[55px] w-full md:w-[450px] bg-white border-t-0">
                            {
                                items.map((item: SelectItemType) => (
                                    <div key={item.key} onClick={() => { 
                                        onSelect(item) 
                                        setShowItems(false)
                                    }} className="flex items-center text-xl h-[55px] px-4 cursor-pointer">
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
