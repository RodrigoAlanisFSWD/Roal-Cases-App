import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { FC, useState } from 'react'
import { Url } from 'url';
import { DashboardLink } from './DashboardLink';
import styles from '../../../styles/atoms/dashboard/DashboardLinkGroup.module.scss'
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
            <li onClick={() => setShowGroup(!showGroup)} className={styles['dashboardLink']}>
                <div>
                    <FontAwesomeIcon icon={group[0].icon ? group[0].icon : faHouse} className={styles['dashboardLink__icon']} />
                    <span>
                        {group[0].text}
                    </span>
                </div>

                <FontAwesomeIcon icon={showGroup ? faAngleUp: faAngleDown} className={styles['dashboardLink__side-icon']} />
            </li>

            <ul className={styles['dashboardGroup']}>
            <AnimatePresence>
            {
                    showGroup ? group.filter((el: Link) => el.text !== group[0].text).map((link: Link) => (
                        <Link key={link.text} href={link.href as Url}>
                            <motion.li initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} className={styles['dashboardGroup__item']}>
                                {link.text}
                            </motion.li>
                        </Link>
                    )) : null

                }
            </AnimatePresence>
            </ul>
        </>
    )
}
