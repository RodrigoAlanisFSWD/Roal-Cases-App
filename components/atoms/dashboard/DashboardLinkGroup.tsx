import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { FC, useState } from 'react'
import { Url } from 'url';
import { AnimatePresence, motion } from "framer-motion"


interface Link {
    text: string;
    icon?: IconProp;
    href: Url | string;
}

interface DahsboardLinkGroupProps {
    group: Link[]
}

export const DashboardLinkGroup: FC<DahsboardLinkGroupProps> = ({ group }) => {

    const [showGroup, setShowGroup] = useState(false)

    return (
        <>
            <li onClick={() => setShowGroup(!showGroup)} className="list-none p-3 pl-0 flex justify-between items-center cursor-pointer">
                <div>
                    <FontAwesomeIcon icon={group[0].icon ? group[0].icon : faHouse} className="mr-4 text-lg sm:text-xl" />
                    <span className="text-xl">
                        {group[0].text}
                    </span>
                </div>

                <FontAwesomeIcon icon={showGroup ? faAngleUp : faAngleDown} />
            </li>

            <AnimatePresence>
                {
                    showGroup && (<ul className="w-full h-auto p-6 pt-0 pl-9">
                        {
                            group.filter((el: Link) => el.text !== group[0].text).map((link: Link) => (

                                <Link key={link.text} href={link.href as Url}>
                                    <motion.li initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }} className="cursor-pointer list-none text-xl mt-4">
                                        {link.text}
                                    </motion.li>
                                </Link>

                            ))
                        }
                    </ul>)

                }
            </AnimatePresence>
        </>
    )
}
