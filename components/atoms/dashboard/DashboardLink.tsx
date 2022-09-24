import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';
import React, { FC } from 'react'
import { Url } from 'url';

interface DashboardLinkProps {
    text: string;
    href: Url;
    icon: IconProp;
}

export const DashboardLink: FC<DashboardLinkProps> = ({ text, href, icon }) => {
    return (
        <Link href={href}>
            <li className="list-none p-3 pl-0 cursor-pointer">
                <FontAwesomeIcon className="mr-4 text-lg" icon={icon} />
                <span className="text-xl">
                    { text }
                </span>
            </li>
        </Link>
    )
}
