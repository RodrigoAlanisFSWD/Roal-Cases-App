import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface Link {
    text: string;
    icon?: any;
    href: any;
}

export interface GroupHeader {
    text: string;
    icon: IconProp;
    href?: any;
}

export interface NavItem {
    links: Array<Link>;
    isGroup: boolean;
    header: GroupHeader;
}