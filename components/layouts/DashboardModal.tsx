import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react'

interface ModalProps {
    children: JSX.Element;
    error?: boolean;
    title: string;
    toolbar?: JSX.Element;
    show: boolean;
    onClose: () => void;
}

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.3,
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

export const DashboardModal: FC<ModalProps> = ({ children, error, title, toolbar, show, onClose }) => {
    return <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
    >
        {
            show && (
                <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} className="w-[calc(100vw-50px)] xl:w-[calc(100vw-350px)] h-[calc(100vh)] bottom-0 right-0 fixed bg-modalBlack flex z-[10000000] justify-center items-center">
                    <motion.div variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit" className={`bg-white shadow-sm rounded-md w-[calc(100%-25px)] sm:w-[450px]`}>
                        {
                            error
                                ?
                                <div className='w-full bg-danger h-[50px] rounded-t-md flex justify-between items-center px-4 text-white'>
                                    <h2 className='text-xl'>
                                        {title}
                                    </h2>
                                    <FontAwesomeIcon className='text-xl' icon={faTimesCircle} onClick={onClose} />
                                </div>
                                :
                                <div className='w-full bg-primary h-[50px] rounded-t-md flex justify-between items-center px-4 text-white'>
                                    <h2 className='text-xl'>
                                        {title}
                                    </h2>
                                    <FontAwesomeIcon className='text-xl' icon={faTimesCircle} onClick={onClose} />
                                </div>
                        }
                        <div className={`h-[calc(100%-50px)] border-t-0 rounded-b-md ${error ? 'border border-danger' : 'border border-primary'} ${!toolbar ? 'grid grid-rows-1' : 'grid grid-rows-[1fr_75px]'} `}>
                            <div className='p-5'>
                                {children}
                            </div>
                            {
                                toolbar && (
                                    <div className='w-full border-t border-gray-300 h-full flex justify-evenly items-center p-5'>
                                        {toolbar}
                                    </div>
                                )
                            }

                        </div>
                    </motion.div>
                </motion.div>
            )
        }

    </AnimatePresence>
}