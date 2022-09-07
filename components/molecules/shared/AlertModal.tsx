import {FC} from "react";
import styles from '../../../styles/molecules/shared/AlertModal.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from '@fortawesome/free-solid-svg-icons'

interface AlertModalProps {
    title: string;
    body: string;
    onClose?: () => void;
}

export const AlertModal: FC<AlertModalProps> = ({title, body, onClose}) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['alertModal']}>
                <div className={styles['alertModal__header']}>
                    <FontAwesomeIcon onClick={onClose} icon={faTimes} className={styles['alertModal__icon']}/>
                    <h2>
                        {title}
                    </h2>
                </div>
                <div className={styles['alertModal__content']}>
                    {body}
                </div>
            </div>
        </div>
    )
}