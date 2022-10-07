import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from '@fortawesome/free-solid-svg-icons'

interface AlertModalProps {
    title: string;
    body: string;
    onClose?: () => void;
}

export const AlertModal: FC<AlertModalProps> = ({title, body, onClose}) => {
    return (
        <div className="top-0 fixed w-screen h-screen bg-modal flex z-[10000000] justify-center items-center">
            <div className="w-[95%] max-w-[500px] min-h-[100px] bg-white p-3 grid grid-cols-1 grid-rows-[30px_1fr] items-center">
                <div className="flex flex-row-reverse justify-between">
                    <FontAwesomeIcon onClick={onClose} icon={faTimes} className="text-xl mr-2"/>
                    <h2 className="text-xl">
                        {title}
                    </h2>
                </div>
                <div className="py-3 flex items-center h-full text-lg">
                    {body}
                </div>
            </div>
        </div>
    )
}