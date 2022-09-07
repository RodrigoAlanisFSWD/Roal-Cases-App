import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';
import React, { FC } from 'react'
import { Url } from 'url';
import styles from '../../../styles/atoms/dashboard/DashboardLink.module.scss'

interface DashboardLinkProps {
    text: string;
    href: Url;
    icon: IconProp;
}

export const DashboardLink: FC<DashboardLinkProps> = ({ text, href, icon }) => {
    return (
        <Link href={href}>
            <li className={styles['dashboardLink']}>
                <FontAwesomeIcon className={styles['dashboardLink__icon']} icon={icon} />
                <span>
                    { text }
                </span>
            </li>
        </Link>
    )
}
