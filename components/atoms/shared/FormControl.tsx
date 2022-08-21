import {FC} from "react";
import styles from "../../../styles/atoms/shared/FormControl.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface FormControlProps {
    placeholder: string;
    type: string;
    name: string;
    icon: IconProp;
    className?: string;
}

export const FormControl: FC<FormControlProps> = ({placeholder, type, name, icon, className}) => {
    return (
        <div className={`${styles['formControl']} ${className}`}>
            <FontAwesomeIcon icon={icon} className={styles['formControl__icon']}/>
            <input placeholder={placeholder} type={type} name={name}/>
        </div>
    )
}