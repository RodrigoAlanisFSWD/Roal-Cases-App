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
    width?: string;
    className?: string;
}

export const Select: FC<SelectProps> = ({ placeholder, items, selectedItem, onSelect, width, className }) => {
    const [showItems, setShowItems] = useState(false);

    return (
        <div className={`w-full flex flex-col ${className}`}>
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
                            transition={{ duration: 0.3 }} className={`border absolute w-full rounded-b-sm mt-[55px] ${width ? width : "w-[calc(100%-98px)] sm:w-[450px]"} bg-white border-t-0`}>
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
